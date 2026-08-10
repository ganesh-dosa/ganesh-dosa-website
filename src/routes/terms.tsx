import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/config";
import { PageHeader, Section } from "@/components/site/section";
import { LegalStyles } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service â€” Ganesh Dosa" },
      { name: "description", content: "Terms of service for using the Ganesh Dosa website and services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <Section>
        <article className="prose-legal">
          <p>
            These terms govern your use of the {business.name} website and services.
          </p>
          <h3>Use of the site</h3>
          <p>
            You agree to use this website only for lawful purposes and in a way that
            does not infringe the rights of others.
          </p>
          <h3>Bookings</h3>
          <p>
            All bookings are subject to our{" "}
            <a href="/booking-policy">Booking Policy</a> and{" "}
            <a href="/cancellation-policy">Cancellation Policy</a>. Prices, menus and
            inclusions may be updated from time to time.
          </p>
          <h3>Liability</h3>
          <p>
            To the maximum extent permitted by law, {business.name} is not liable
            for indirect, consequential or special damages arising from your use of
            this site.
          </p>
          <h3>Governing law</h3>
          <p>
            These terms are governed by the laws of Victoria, Australia.
          </p>
        </article>
      </Section>
      <LegalStyles />
    </>
  );
}
