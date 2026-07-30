import { defineEventHandler, readRawBody, createError } from "h3";
import Stripe from "stripe";

// ─── Google Sheets via REST + service-account JWT ────────────────────────────

function pemToDer(pem: string): Uint8Array {
  const b64 = pem
    // Vercel env vars are single-line — the key is usually pasted with
    // literal "\n" escape sequences instead of real newlines.
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// Fix: use TextEncoder for strings (safe for any Unicode) and a loop for
// Uint8Array (spread throws RangeError on large buffers in some runtimes).
function base64url(input: Uint8Array | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getGoogleAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );

  const sigInput = new TextEncoder().encode(`${header}.${payload}`);
  const der = pemToDer(privateKeyPem);
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    der as BufferSource,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBytes = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, sigInput));
  const jwt = `${header}.${payload}.${base64url(sigBytes)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Google token error: ${err}`);
  }
  const { access_token } = (await tokenRes.json()) as { access_token: string };
  return access_token;
}

async function appendToSheet(sheetId: string, row: string[]): Promise<void> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!clientEmail || !privateKey) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY not set");
  }

  const token = await getGoogleAccessToken(clientEmail, privateKey);
  // Fix: use Sheet1!A1 (unbounded) instead of Sheet1!A1:P1 (row-bounded).
  // The row-bounded range caused the API to always append after row 1,
  // inserting new bookings at row 2 rather than the true end of the sheet.
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets append error: ${err}`);
  }
}

// ─── Twilio SMS ───────────────────────────────────────────────────────────────

// Twilio requires E.164 (+<country code><number>). Customers type Australian
// numbers in local format (04XX XXX XXX), so normalize before sending.
function toE164Au(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+61${digits.slice(1)}`;
  if (digits.startsWith("61")) return `+${digits}`;
  return `+61${digits}`;
}

async function sendSms(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) throw new Error("Twilio env vars not set");

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: toE164Au(to), From: from, Body: body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio error: ${err}`);
  }
}

// ─── Idempotency ──────────────────────────────────────────────────────────────
// Best-effort in-memory guard for Stripe webhook retries within the same
// serverless function instance. Does not survive cold starts — see the note
// in appendToSheet for why Sheets failure still propagates as 500.
const processedEventIds = new Set<string>();

// ─── Webhook handler ──────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event, "utf8");
  if (!rawBody) throw createError({ statusCode: 400, message: "Empty body" });

  const signature = event.node?.req?.headers?.["stripe-signature"] as string | undefined
    ?? (event.headers?.get?.("stripe-signature") ?? "");
  if (!signature) throw createError({ statusCode: 400, message: "Missing stripe-signature" });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw createError({ statusCode: 500, message: "Webhook secret not configured" });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Stripe webhook error:", err);
    throw createError({ statusCode: 400, message: msg });
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    return { received: true };
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  // Fix #7 (payment_status): only treat the session as confirmed when money
  // has actually cleared. Guards against async payment methods (BECS, etc.)
  // if they are ever enabled alongside card payments.
  if (session.payment_status !== "paid") {
    return { received: true };
  }

  // Fix #6 (idempotency): skip duplicate processing for warm retries
  if (processedEventIds.has(stripeEvent.id)) {
    console.log(`Duplicate webhook event skipped: ${stripeEvent.id}`);
    return { received: true };
  }

  const m = (session.metadata ?? {}) as Record<string, string>;

  const customerName = m.customerName ?? "";
  const customerPhone = m.customerPhone ?? "";
  const customerEmail = m.customerEmail ?? "";
  const suburb = m.suburb ?? "";
  const eventDate = m.eventDate ?? "";
  const eventTime = m.eventTime ?? "";
  const guests = m.guests ?? "";
  const service = m.service ?? "";
  const packageId = m.packageId ?? "";
  const notes = m.notes ?? "";
  const distanceKm = m.distanceKm ?? "";
  const total = m.total ?? "";
  const amountDueNow = m.amountDueNow ?? "";
  const paymentType = m.payFull === "true" ? "Full payment" : "Deposit";
  const stripePaymentId = session.payment_intent ? String(session.payment_intent) : session.id;
  const businessPhone = process.env.OWNER_PHONE ?? "";

  // ── Google Sheets row — must match the sheet's header order exactly:
  // Timestamp, Name, Email, Phone, Suburb, Service, Package, Guests, Date,
  // Time, Extras, Distance (km), Total ($), Amount Paid ($), Payment Type,
  // Stripe ID, Notes
  const timestamp = new Date().toISOString();
  const sheetRow = [
    timestamp,
    customerName,
    customerEmail,
    customerPhone,
    suburb,
    service,
    packageId,
    guests,
    eventDate,
    eventTime,
    (() => {
      try {
        return JSON.parse(m.extras ?? "{}").cutlery ? "Cutlery" : "No";
      } catch {
        return "No";
      }
    })(),
    distanceKm,
    total,
    amountDueNow,
    paymentType,
    stripePaymentId,
    notes,
  ];

  // Fix #3 (errors swallowed): let Sheets failure propagate as 500 so Stripe
  // retries the webhook and the booking record is eventually written.
  // SMS sends remain non-fatal — a missed notification is recoverable,
  // a missing booking record is not.
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (sheetId) {
    await appendToSheet(sheetId, sheetRow);
  } else {
    console.warn("GOOGLE_SHEET_ID not set — booking not recorded in sheet:", stripePaymentId);
  }

  // Mark processed only after Sheets succeeds, so a failed Sheets write
  // (which returns 500 and triggers a Stripe retry) does not skip the retry.
  processedEventIds.add(stripeEvent.id);

  // ── SMS notifications — fire in parallel, non-fatal ───────────────────────
  const customerMsg = customerPhone
    ? `Hi ${customerName}, your Ganesh Dosa booking is confirmed for ${eventDate} at ${suburb}. ` +
      `Guests: ${guests}. Amount paid: $${amountDueNow} AUD. ` +
      `Payment ref: ${stripePaymentId}. ` +
      // Plain hyphen, not an em-dash: an em-dash forces UCS2 encoding
      // (70 chars/segment instead of 160), which pushed this over Twilio's
      // trial-account length cap and got flagged as undelivered.
      `Questions? Call us on ${businessPhone}. - Ganesh Dosa`
    : null;

  const ownerPhone = process.env.OWNER_PHONE;
  const ownerMsg = ownerPhone
    ? `New booking confirmed: ${customerName}, ${customerPhone}. ` +
      `Date: ${eventDate}, ${suburb}. Guests: ${guests}. ` +
      `Package: ${service}. Paid: $${amountDueNow} AUD (ref ${stripePaymentId}).`
    : null;

  // Fix #6 (efficiency): send both SMS in parallel rather than sequentially
  await Promise.all([
    customerMsg
      ? sendSms(customerPhone, customerMsg).catch((err) =>
          console.error("Customer SMS error (non-fatal):", err),
        )
      : Promise.resolve(),
    ownerMsg && ownerPhone
      ? sendSms(ownerPhone, ownerMsg).catch((err) =>
          console.error("Owner SMS error (non-fatal):", err),
        )
      : Promise.resolve(),
  ]);

  return { received: true };
});
