import { defineEventHandler, readBody, createError, getRequestURL } from "h3";
import Stripe from "stripe";

const PRICE_PER_PERSON = 20;
const MIN_GUESTS = 30;
const MAX_GUESTS = 150;
const CATERING_MAX_GUESTS = 300;

const CATERING_PACKAGES: Record<string, { priceFrom: number; minGuests: number }> = {
  "package-1": { priceFrom: 22, minGuests: 20 },
  "package-2": { priceFrom: 25, minGuests: 25 },
  "package-3": { priceFrom: 30, minGuests: 30 },
};
const DELIVERY_TIER1_KM = 50;
const DELIVERY_TIER1_FEE = 60;
const DELIVERY_TIER2_FEE = 100;
const MAX_RADIUS_KM = 150;
const DEPOSIT_PERCENT = 20;

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const body = await readBody<Record<string, unknown>>(event);

  const {
    name, email, phone, suburb,
    eventDate, eventTime, service, packageId, eventType, notes,
    selectedExtras, distanceKm, payFull, guests,
  } = body as {
    name: string; email: string; phone: string; suburb: string;
    eventDate: string; eventTime: string; service: string;
    packageId?: string; eventType: string; notes: string;
    selectedExtras: Record<string, boolean>;
    distanceKm: number; payFull: boolean; guests: number;
  };

  const isCatering = String(service) === "catering";
  const catPkg = isCatering ? (CATERING_PACKAGES[String(packageId ?? "package-1")] ?? CATERING_PACKAGES["package-1"]) : null;
  const pricePerPerson = catPkg ? catPkg.priceFrom : PRICE_PER_PERSON;
  const minGuests = catPkg ? catPkg.minGuests : MIN_GUESTS;
  const maxGuests = isCatering ? CATERING_MAX_GUESTS : MAX_GUESTS;

  if (!name || !email || !phone || !eventDate || !guests) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }
  if (!/^\S+@\S+\.\S+$/.test(String(email))) {
    throw createError({ statusCode: 400, message: "Invalid email address" });
  }
  if (String(phone).replace(/\D/g, "").length < 7) {
    throw createError({ statusCode: 400, message: "Invalid phone number" });
  }

  const parsedGuests = Math.max(minGuests, Math.min(maxGuests, parseInt(String(guests), 10)));
  const parsedDistance = Math.max(0, parseInt(String(distanceKm || 0), 10));

  if (parsedDistance > MAX_RADIUS_KM) {
    throw createError({ statusCode: 400, message: `We deliver within ${MAX_RADIUS_KM}km of Melbourne CBD` });
  }

  const base = parsedGuests * pricePerPerson;
  const extrasTotal = (selectedExtras as Record<string, boolean>)?.cutlery ? 2 * parsedGuests : 0;
  const deliveryFee = parsedDistance <= DELIVERY_TIER1_KM ? DELIVERY_TIER1_FEE : DELIVERY_TIER2_FEE;
  const total = base + extrasTotal + deliveryFee;
  const deposit = Math.round(total * (DEPOSIT_PERCENT / 100));
  const amountDueNow = payFull ? total : deposit;

  const reqUrl = getRequestURL(event);
  const origin = `${reqUrl.protocol}//${reqUrl.host}`;
  const payLabel = payFull ? "Full payment" : `${DEPOSIT_PERCENT}% deposit`;
  const serviceLabel = isCatering && packageId
    ? `Catering – ${String(packageId).replace(/-/g, " ")}`
    : String(service || "live-counter").replace(/-/g, " ");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: String(email),
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: `Ganesh Dosa – ${serviceLabel} (${parsedGuests} guests)`,
            description: `${eventDate} · ${suburb} · ${payLabel}`,
          },
          unit_amount: amountDueNow * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      customerName: String(name).slice(0, 500),
      customerPhone: String(phone).slice(0, 50),
      customerEmail: String(email).slice(0, 200),
      suburb: String(suburb).slice(0, 200),
      eventDate: String(eventDate),
      eventTime: String(eventTime || ""),
      guests: String(parsedGuests),
      service: String(service || "live-counter"),
      eventType: String(eventType || ""),
      notes: String(notes || "").slice(0, 500),
      extras: JSON.stringify(selectedExtras || {}).slice(0, 500),
      distanceKm: String(parsedDistance),
      total: String(total),
      amountDueNow: String(amountDueNow),
      payFull: String(!!payFull),
    },
    success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/booking`,
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : "Stripe error";
    console.error("Stripe checkout error:", err);
    throw createError({ statusCode: 500, message: msg });
  });

  return { url: session.url };
});
