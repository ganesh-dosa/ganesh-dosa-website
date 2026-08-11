import { createFileRoute } from "@tanstack/react-router";
import { liveCounter } from "@/lib/config";
import { PageHeader, Section } from "@/components/site/section";
import { LegalStyles } from "./privacy";

export const Route = createFileRoute("/booking-policy")({
  head: () => ({
    meta: [
      { title: "Booking Policy — Ganesh Dosa" },
      { name: "description", content: "How bookings, deposits and confirmations work with Ganesh Dosa." },
    ],
  }),
  component: BookingPolicyPage,
});

function BookingPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Booking Policy" />
      <Section>
        <article className="prose-legal">
          <h3>Lead time</h3>
          <p>
            The live dosa counter has a minimum lead time of {liveCounter.leadTimeDays}{" "}
            calendar days from today's date. Larger events (weddings, corporate)
            should be booked as far in advance as possible.
          </p>
          <h3>Guest counts</h3>
          <p>
            The live counter serves a minimum of {liveCounter.minGuests} and a maximum of{" "}
            {liveCounter.maxGuests} guests. Final guest count must be confirmed at
            least 7 days before the event.
          </p>
          <h3>Quotes and deposits</h3>
          <p>
            As you enter your event details on our booking page, you'll see a live
            quotation update in real time — no need to wait for a written quote.
            A minimum 20% deposit is required to secure your date, or you may pay
            the full amount upfront; the balance (if any) is due before the event.
            Payment is processed securely online via Stripe.
          </p>
          <h3>Changes</h3>
          <p>
            Guest counts and menu selections can be changed up to 7 days before the
            event. Changes made after that may attract additional charges.
          </p>
          <h3>Travel and setup</h3>
          <p>
            Travel outside Melbourne CBD, additional service staff, extended service
            time, plates &amp; cutlery and specific setup requirements are quoted
            separately based on your event.
          </p>
        </article>
      </Section>
      <LegalStyles />
    </>
  );
}
