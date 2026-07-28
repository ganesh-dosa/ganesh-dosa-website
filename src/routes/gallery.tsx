import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlaceholder } from "@/components/site/section";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Dosa Ganesh Events in Melbourne" },
      { name: "description", content: "Live dosa counters, catering, in-store parties and customer moments from across Melbourne." },
    ],
  }),
  component: GalleryPage,
});

type Category = "All" | "Birthday" | "Wedding" | "Corporate" | "Live Counter" | "In-store" | "Customer Moments";

const items: { label: string; cat: Exclude<Category, "All">; aspect: string }[] = [
  { label: "Live counter, Brunswick birthday", cat: "Live Counter", aspect: "aspect-[4/5]" },
  { label: "Sangeet, Point Cook — 120 guests", cat: "Wedding", aspect: "aspect-[16/10]" },
  { label: "Corporate lunch, Docklands", cat: "Corporate", aspect: "aspect-square" },
  { label: "Housewarming, Glen Waverley", cat: "Customer Moments", aspect: "aspect-[4/5]" },
  { label: "Wedding reception, Werribee", cat: "Wedding", aspect: "aspect-[16/10]" },
  { label: "Kids party at Dosa Ganesh", cat: "In-store", aspect: "aspect-square" },
  { label: "Community Diwali, Preston", cat: "Customer Moments", aspect: "aspect-[4/5]" },
  { label: "Team lunch, Southbank", cat: "Corporate", aspect: "aspect-square" },
  { label: "Chef pouring dosa batter", cat: "Live Counter", aspect: "aspect-[16/10]" },
  { label: "Chutneys and sambar close-up", cat: "Live Counter", aspect: "aspect-square" },
  { label: "Golden ghee roast off the tawa", cat: "Live Counter", aspect: "aspect-[4/5]" },
  { label: "Guests plating masala dosa", cat: "Customer Moments", aspect: "aspect-square" },
  { label: "Baby shower table, Kew", cat: "In-store", aspect: "aspect-[4/5]" },
  { label: "50th birthday, Doncaster", cat: "Birthday", aspect: "aspect-square" },
  { label: "Milestone birthday, Point Cook", cat: "Birthday", aspect: "aspect-[16/10]" },
  { label: "Engagement lunch, South Yarra", cat: "Wedding", aspect: "aspect-[4/5]" },
];

const categories: Category[] = ["All", "Birthday", "Wedding", "Corporate", "Live Counter", "In-store", "Customer Moments"];

function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <>
      {/* HERO */}
      <section className="ink-panel relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 sm:px-8 sm:pt-28 sm:pb-20">
          <div className="flex items-center gap-4">
            <span className="gold-hairline w-14" aria-hidden />
            <span className="eyebrow text-accent">Gallery</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] text-cream">
            Melbourne, <span className="italic gold-text">one dosa</span> at a time.
          </h1>
          <p className="mt-6 max-w-xl text-cream/70">
            A selection of recent events across the city — every image will be
            replaced with client-owned photography.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 sm:px-8">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {filtered.map((it) => (
            <figure
              key={it.label}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            >
              <ImagePlaceholder label={it.label} aspect={it.aspect} />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <span className="eyebrow text-[0.55rem] text-accent">{it.cat}</span>
                  <p className="mt-1 font-display text-lg text-cream">{it.label}</p>
                </div>
              </div>
            </figure>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground">No images in this category yet.</p>
        )}
      </section>
    </>
  );
}
