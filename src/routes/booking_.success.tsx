import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHeader, Section } from "@/components/site/section";
import { z } from "zod";

const searchSchema = z.object({
  session_id: z.string().optional(),
});

export const Route = createFileRoute("/booking_/success")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Booking Confirmed — Ganesh Dosa" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Your Ganesh Dosa booking is confirmed." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { session_id } = Route.useSearch();
  const paid = !!session_id;

  return (
    <>
      <PageHeader
        eyebrow="Thanks!"
        title={paid ? "Booking confirmed!" : "We've received your enquiry."}
      />
      <Section>
        <div className="mx-auto max-w-xl rounded-3xl border border-secondary/40 bg-secondary/10 p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" />
          <h2 className="mt-4 font-display text-2xl text-primary">
            {paid ? "Payment received." : "You're on our list."}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {paid
              ? "Your Ganesh Dosa booking is confirmed and payment processed. You'll receive an SMS shortly with your booking details. We'll also be in touch closer to your event."
              : "One of us will get back to you within 24 hours to confirm availability, pricing and the next steps. In the meantime, feel free to WhatsApp us if you'd like a faster reply."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-primary"
            >
              Back home
            </Link>
            <Link
              to="/menu"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Browse the menu
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
