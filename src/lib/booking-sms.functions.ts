import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Sends two SMS via Twilio: one to the owner, one to the customer.
// Requires connected Twilio credentials in env:
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, OWNER_PHONE
// Configure the Twilio connector in Lovable to populate these automatically,
// or add them via project secrets.

const payloadSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(6),
  service: z.string(),
  guests: z.number().int(),
  date: z.string(),
  time: z.string(),
  suburb: z.string(),
  total: z.number(),
  amountDueNow: z.number(),
  eventType: z.string().optional(),
});

async function sendSms(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) {
    throw new Error("Twilio credentials not configured");
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const params = new URLSearchParams({ To: to, From: from, Body: body });
  const auth = btoa(`${sid}:${token}`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio ${res.status}: ${text}`);
  }
}

export const sendBookingSms = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }) => {
    const owner = process.env.OWNER_PHONE;
    const summary =
      `Ganesh Dosa booking\n` +
      `${data.customerName} · ${data.customerPhone}\n` +
      `${data.service} · ${data.guests} guests\n` +
      `${data.date} ${data.time} · ${data.suburb}\n` +
      (data.eventType ? `${data.eventType}\n` : "") +
      `Total $${data.total} · Due now $${data.amountDueNow}`;

    const results: { target: string; ok: boolean; error?: string }[] = [];

    try {
      await sendSms(
        data.customerPhone,
        `Hi ${data.customerName}, your Ganesh Dosa booking is confirmed for ${data.date} at ${data.time} (${data.guests} guests). Total $${data.total}, due now $${data.amountDueNow}. We'll be in touch shortly. — Ganesh Dosa`,
      );
      results.push({ target: "customer", ok: true });
    } catch (err) {
      results.push({ target: "customer", ok: false, error: String(err) });
    }

    if (owner) {
      try {
        await sendSms(owner, summary);
        results.push({ target: "owner", ok: true });
      } catch (err) {
        results.push({ target: "owner", ok: false, error: String(err) });
      }
    }

    return { results };
  });
