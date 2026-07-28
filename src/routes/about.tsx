import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/config";
import { ImagePlaceholder, PageHeader, Section, SectionHeading } from "@/components/site/section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dosa Ganesh" },
      { name: "description", content: "The story behind Dosa Ganesh — Melbourne's live dosa counter for celebrations of every size." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A dosa story, made in Melbourne."
        intro={`${business.name} started with a simple idea: bring the joy of a South Indian tiffin house to the events people were already celebrating around Melbourne.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder label="Portrait of the chef / founder at the tawa" />
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our chef trained in the tiffin houses of Bengaluru before moving to
              Melbourne, and every batter that leaves our kitchen is fermented the
              old way — slow, patient, and by hand.
            </p>
            <p>
              Today, we run live dosa counters at weddings, corporate lunches,
              community events and family celebrations right across Melbourne.
              And when we're not on the road, we host small parties at our own
              premises.
            </p>
            <p>
              It's the food we grew up on. We just cook it a little louder now.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="What we stand for" title="Three simple promises" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Fresh", "Every dosa is cooked to order. No trays. No warmers."],
            ["Generous", "Unlimited service is the point. Guests eat until they're happy."],
            ["Real", "No shortcuts, no premixes. Same batter, same ghee, same hands."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
