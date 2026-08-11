import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PageHeader, Section } from "@/components/site/section";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Ganesh Dosa" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Internal admin area." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Internal" title="Admin" intro="Placeholder admin surface. Wire authentication and booking management here." />
      <Section>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          <Lock className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-2xl text-primary">Sign in required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The admin dashboard for managing bookings, enquiries and packages is
            not yet connected. Admin authentication and live bookings database
            coming soon.
          </p>
        </div>
      </Section>
    </>
  );
}
