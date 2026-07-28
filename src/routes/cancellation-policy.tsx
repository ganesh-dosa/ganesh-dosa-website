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
            The following draft policy explains how cancellations and rescheduling
            work. Actual refund percentages are pending final confirmation with{" "}
            {business.name}.
          </p>
          <h3>Cancellations by you</h3>
          <ul>
            <li>More than 14 days before the event — refund of deposit less any costs already incurred (TBC).</li>
            <li>7–14 days before the event — partial refund of deposit (TBC).</li>
            <li>Less than 7 days before the event — deposit is non-refundable.</li>
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
