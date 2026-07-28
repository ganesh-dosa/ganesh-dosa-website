import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Minus, Plus, Star } from "lucide-react";
import { cateringPackages, faqs } from "@/lib/config";



export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Catering Packages — Dosa Ganesh Melbourne" },
      {
        name: "description",
        content:
          "Three catering tiers — Essential, Celebration and Signature Live Counter — for Melbourne weddings, birthdays and corporate events.",
      },
    ],
  }),
  component: CateringPage,
});

const comparison = [
  ["Dosa varieties", "3", "6", "10 (live)"],
  ["Sides", "Idli · Vada", "Idli · Vada · Uttapam", "Idli · Vada"],
  ["Chutneys", "2 + sambar", "3 + sambar + rasam", "Full spread"],
  ["Coffee & sweet", "Add-on", "Included", "Included"],
  ["Service staff", "Delivered", "On-site", "Chef-led counter"],
  ["Min guests", "20", "30", "30"],
  ["Format", "Buffet trays", "Buffet + staff", "Live counter"],
];

export const cateringTestimonials = [
  ["The Celebration tier hit exactly the note we wanted at our engagement — abundant, unhurried, and photographed beautifully.", "Meera & Arjun", "Engagement · South Yarra"],
  ["We booked the Signature counter for a 130-person office milestone. The chef was the whole show. Zero fuss.", "Devang", "Corporate · Docklands"],
  ["Essential trays for a family birthday of 25. Warm on arrival, generous portions, everyone asked for the leftovers.", "Kavya", "Birthday · Glen Waverley"],
] as const;

function CateringPage() {
  return (
    <>
      {/* HERO */}
      <section className="ink-panel relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <span className="gold-hairline w-14" aria-hidden />
                <span className="eyebrow text-accent">Catering · Three Tiers</span>
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] text-cream">
                A tier for every
                <br />
                <span className="italic gold-text">occasion.</span>
              </h1>
              <p className="mt-6 max-w-lg text-cream/70">
                From a housewarming for twenty to a wedding for one-fifty — three
                thoughtfully composed catering menus, or a fully bespoke build.
                All vegetarian, mostly gluten-free.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["Essential", "Celebration", "Signature"].map((t, i) => (
                <div key={t} className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-4 backdrop-blur">
                  <p className="eyebrow text-[0.55rem] text-accent/70">Tier 0{i + 1}</p>
                  <p className="mt-2 font-display text-lg text-cream">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGE CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-6 md:grid-cols-3">
          {cateringPackages.map((p, i) => {
            const featured = i === 1;
            return (
              <div
                key={p.id}
                className={`group relative flex flex-col overflow-hidden rounded-3xl transition-all ${
                  featured
                    ? "ink-panel shadow-[var(--shadow-luxe)] lg:-my-6"
                    : "border border-border bg-card"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={`/images/catering-package-${i + 1}.jpg`}
                    alt={`${p.name} — ${p.tagline}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink">
                      Most booked
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <span className={`eyebrow text-[0.6rem] ${featured ? "text-accent/80" : "text-primary/70"}`}>
                    Tier 0{i + 1}
                  </span>
                  <h3 className={`mt-2 font-display text-3xl ${featured ? "text-cream" : "text-foreground"}`}>
                    {p.name}
                  </h3>
                  <p className={`mt-2 text-sm italic ${featured ? "text-cream/60" : "text-muted-foreground"}`}>
                    {p.tagline}
                  </p>
                  <div className={`gold-hairline my-6 w-16`} aria-hidden />
                  <p className={`font-display text-4xl ${featured ? "gold-text" : "text-primary"}`}>
                    {p.priceFrom == null ? "POA" : `$${p.priceFrom}/pp`}
                  </p>
                  <p className={`mt-1 text-xs ${featured ? "text-cream/50" : "text-muted-foreground"}`}>
                    Minimum {p.minGuests} guests
                  </p>
                  <ul className={`mt-6 flex-1 space-y-2.5 text-sm ${featured ? "text-cream/85" : "text-foreground/85"}`}>
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-accent" : "text-secondary"}`} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/booking"
                    search={{ service: "catering", package: p.id }}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-all ${
                      featured
                        ? "bg-accent text-ink hover:-translate-y-0.5"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Book now <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-[oklch(0.94_0.025_85)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="text-center">
            <span className="eyebrow text-primary">Compare</span>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              Side by <span className="italic gold-text">side.</span>
            </h2>
          </div>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-background">
            <div className="grid grid-cols-4 border-b border-border bg-muted/40 px-4 py-5 sm:px-8">
              <span className="eyebrow text-[0.6rem] text-muted-foreground">Feature</span>
              {["Essential", "Celebration", "Signature"].map((t, i) => (
                <span
                  key={t}
                  className={`text-center font-display text-lg ${i === 1 ? "text-primary" : "text-foreground"}`}
                >
                  {t}
                </span>
              ))}
            </div>
            {comparison.map((row, ri) => (
              <div
                key={row[0]}
                className={`grid grid-cols-4 items-center px-4 py-4 text-sm sm:px-8 ${
                  ri % 2 === 1 ? "bg-muted/20" : ""
                }`}
              >
                <span className="font-medium text-foreground/80">{row[0]}</span>
                {row.slice(1).map((cell, ci) => (
                  <span
                    key={ci}
                    className={`text-center ${ci === 1 ? "font-medium text-primary" : "text-foreground/70"}`}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="bg-[oklch(0.94_0.025_85)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="text-center">
            <span className="eyebrow text-primary">Kind Words</span>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              Told by our <span className="italic gold-text">hosts.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {cateringTestimonials.map(([q, a, ev]) => (
              <figure key={a} className="rounded-2xl border border-border bg-background p-8">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg italic text-foreground/90">"{q}"</blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium text-foreground">{a}</p>
                  <p className="eyebrow mt-1 text-[0.6rem] text-primary/70">{ev}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
        <span className="eyebrow text-primary">FAQ</span>
        <h2 className="mt-4 font-display text-4xl text-foreground">Catering questions</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="font-display text-lg text-foreground">{f.q}</h3>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-primary transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="ink-panel relative overflow-hidden rounded-3xl p-12 text-center sm:p-16">
          <Minus className="pointer-events-none absolute inset-0 hidden" aria-hidden />
          <h2 className="font-display text-4xl text-cream sm:text-5xl">
            Ready to <span className="italic gold-text">plan the menu?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/70">
            Send an enquiry — we'll reply within 24 hours with a tailored quote.
          </p>
          <Link
            to="/booking"
            search={{ service: "catering" }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink hover:bg-[oklch(0.88_0.13_88)]"
          >
            Start a catering enquiry <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
