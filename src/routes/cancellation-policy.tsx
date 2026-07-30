import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/config";
import { PageHeader, Section } from "@/components/site/section";
import { LegalStyles } from "./privacy";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy — Dosa Ganesh" },
      { name: "description", content: "How cancellations, rescheduling and refunds work with Dosa Ganesh." },
    ],
  }),
  component: CancellationPage,
});

function CancellationPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Cancellation Policy" />
      <Section>
        <article className="prose-legal">
          <p>
            The following policy explains how cancellations and rescheduling
            work with {business.name}.
          </p>
          <h3>Cancellations by you</h3>
          <ul>
            <li>Within 72 hours of booking, if you paid the 20% deposit — you'll receive a partial refund of your deposit.</li>
            <li>Within 72 hours of booking, if you paid in full — you'll receive a 70% refund of the amount paid (not the full amount).</li>
            <li>After 72 hours of booking — no refund, regardless of whether you paid the deposit or in full.</li>
          </ul>
          <h3>Rescheduling</h3>
          <p>
            We're happy to reschedule where possible. Rescheduling within 7 days of
            the event is subject to availability and may attract a fee.
          </p>
          <h3>Cancellations by us</h3>
          <p>
            In the unlikely event that we need to cancel — for reasons outside our
            control — we'll do everything we can to source an alternative provider
            or refund your deposit in full.
          </p>
          <h3>Force majeure</h3>
          <p>
            Neither party is liable for delays or cancellations caused by events
            beyond reasonable control (fire, flood, government restrictions, etc.).
          </p>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        </article>
      </Section>
      <LegalStyles />
    </>
  );
}
