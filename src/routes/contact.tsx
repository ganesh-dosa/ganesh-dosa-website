import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/config";
import { PageHeader, Section } from "@/components/site/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dosa Ganesh Melbourne" },
      { name: "description", content: "Get in touch with Dosa Ganesh. WhatsApp, phone, email — we reply within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        intro="Fastest reply is on WhatsApp. Otherwise, phone or email works — we typically get back within 24 hours."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 hover:border-primary/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-primary">WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fastest way to reach us — send a message and we'll reply asap.
              </p>
              <p className="mt-2 text-sm font-medium">{business.phone}</p>
            </div>
          </a>

          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 hover:border-primary/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-primary">Phone</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Available during trading hours.
              </p>
              <p className="mt-2 text-sm font-medium">{business.phone}</p>
            </div>
          </a>

          <a
            href={`mailto:${business.email}`}
            className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 hover:border-primary/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-charcoal">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-primary">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For detailed enquiries and quotes.
              </p>
              <p className="mt-2 text-sm font-medium">{business.email}</p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted text-foreground">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-primary">Where we are</h3>
              <p className="mt-1 text-sm text-muted-foreground">{business.address}</p>
              <p className="mt-2 text-sm">{business.hours}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
