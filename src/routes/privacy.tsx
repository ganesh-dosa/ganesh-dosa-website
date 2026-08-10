import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/config";
import { PageHeader, Section } from "@/components/site/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy â€” Ganesh Dosa" },
      { name: "description", content: "How Ganesh Dosa collects, uses and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <article className="prose-legal">
          <p>
            This policy is maintained by {business.name} to explain what personal
            information we collect and how we use it.
          </p>
          <h3>Information we collect</h3>
          <p>
            When you enquire about a booking we collect your name, contact details,
            event date, guest count, suburb and any notes you send us. We only use
            this information to respond to your enquiry and, if you book, to plan
            and deliver your event.
          </p>
          <h3>How we use your information</h3>
          <ul>
            <li>Responding to enquiries and quotes.</li>
            <li>Confirming bookings, staffing and logistics.</li>
            <li>Sending you booking-related updates.</li>
          </ul>
          <h3>Sharing</h3>
          <p>
            We do not sell your data. We only share what's necessary with our own
            staff and suppliers involved in your event.
          </p>
          <h3>Contact</h3>
          <p>
            To access, update or delete your data, email us at{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        </article>
      </Section>
      <LegalStyles />
    </>
  );
}

export function LegalStyles() {
  return (
    <style>{`
      .prose-legal { max-width: 42rem; color: var(--foreground); }
      .prose-legal p, .prose-legal ul { margin: 1rem 0; line-height: 1.7; color: color-mix(in oklab, var(--foreground) 80%, transparent); }
      .prose-legal h3 { font-family: var(--font-display); font-size: 1.5rem; margin-top: 2rem; color: var(--primary); }
      .prose-legal ul { padding-left: 1.25rem; list-style: disc; }
      .prose-legal a { color: var(--primary); text-decoration: underline; }
    `}</style>
  );
}
