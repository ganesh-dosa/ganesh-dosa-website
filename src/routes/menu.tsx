import { createFileRoute } from "@tanstack/react-router";
import { menu } from "@/lib/config";
import { PageHeader, Section, SectionHeading } from "@/components/site/section";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Dosa Ganesh" },
      { name: "description", content: "Ten dosa varieties plus sides — the full Dosa Ganesh menu." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Menu"
        title="Ten dosas. And everything alongside."
        intro="A rotating selection served live at your event. All vegetarian, most naturally gluten-free."
      />

      <Section>
        <SectionHeading eyebrow="Dosas" title="Ten varieties" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {menu.dosas.map((d) => (
            <div key={d.name} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xl text-primary">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Sides & sips" title="Alongside the dosas" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {menu.sides.map((d) => (
            <div key={d.name} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xl text-primary">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Idli, medu vada and filter coffee inclusion for the live counter package is
          pending final client confirmation.
        </p>
      </Section>
    </>
  );
}
