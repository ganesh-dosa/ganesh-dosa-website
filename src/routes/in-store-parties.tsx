import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Plus, Star, Users } from "lucide-react";
import { inStore, menu, faqs } from "@/lib/config";

export const Route = createFileRoute("/in-store-parties")({
  head: () => ({
    meta: [
      { title: "In-Store Dosa Parties — Ganesh Dosa Melbourne" },
      {
        name: "description",
        content: `Host your celebration at Ganesh Dosa. $${inStore.basePrice} for ${inStore.baseGuests} guests, unlimited dosas.`,
      },
    ],
  }),
  component: InStorePage,
});

const sessions = [
  { time: "12:00 — 2:00 PM", label: "Lunch sitting", note: "Ideal for kids parties & family lunches" },
  { time: "3:00 — 5:00 PM", label: "Afternoon", note: "Baby showers, bridal luncheons" },
  { time: "6:30 — 8:30 PM", label: "Evening", note: "Birthdays & housewarming after-parties" },
];

function InStorePage() {
  return (
    <>
      {/* HERO — split editorial */}
      <section className="relative overflow-hidden bg-[oklch(0.97_0.018_88)]">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-20 sm:px-8 sm:pt-28">
          <div className="flex items-center gap-4">
            <span className="gold-hairline w-14 bg-primary" aria-hidden />
            <span className="eyebrow text-primary">In-Store Parties</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] text-foreground">
            Small gatherings.
            <br />
            <span className="italic gold-text">Endless dosas.</span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Book out our little corner of Melbourne for your celebration. Ten
            seats, unlimited dosas, brewing fresh. We handle the
            cooking; you handle the toasts.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/booking"
              search={{ service: "in-store" }}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
            >
              Reserve a session <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <a
              href="#menu"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground/70 hover:text-primary"
            >
              See what's on the menu →
            </a>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <span className="eyebrow text-primary">The Package</span>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              What you <span className="italic gold-text">get.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              A relaxed two-hour sitting, ten guests, unlimited dosas from the
              tawa. Add-ons like additional guests, extended time and menu upgrades
              on enquiry.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ...inStore.includedMenu,
              "Reserved table for your party",
              "House chutneys & sambar",
              "Filter coffee refills",
              "Friendly, unrushed service",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-sm text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SESSIONS */}
      <section className="bg-[oklch(0.94_0.025_85)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-primary">Sessions</span>
              <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
                Pick your <span className="italic gold-text">sitting.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Session times below are indicative — final slots are configurable and
              pending client confirmation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {sessions.map((s) => (
              <div
                key={s.label}
                className="group rounded-3xl border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-accent/60"
              >
                <Clock className="h-6 w-6 text-primary" />
                <p className="mt-6 font-display text-2xl text-foreground">{s.label}</p>
                <p className="mt-1 eyebrow text-[0.6rem] text-primary">{s.time}</p>
                <p className="mt-4 text-sm text-muted-foreground">{s.note}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span className="flex items-center gap-2 text-foreground/70">
                    <Users className="h-3.5 w-3.5" /> up to {inStore.baseGuests}
                  </span>
                  <Link
                    to="/booking"
                    search={{ service: "in-store" }}
                    className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.18em] text-primary hover:text-accent"
                  >
                    Reserve <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div>
          <div>
            <span className="eyebrow text-primary">On the tawa</span>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              Dosa <span className="italic gold-text">varieties.</span>
            </h2>
            <ul className="mt-10 divide-y divide-border">
              {menu.dosas.slice(0, 6).map((d) => (
                <li key={d.name} className="flex items-baseline justify-between gap-6 py-4">
                  <div>
                    <p className="font-display text-lg text-foreground">{d.name}</p>
                    <p className="text-sm text-muted-foreground">{d.desc}</p>
                  </div>
                  <span className="eyebrow text-[0.6rem] text-accent">Unlimited</span>
                </li>
              ))}
            </ul>
            <Link
              to="/menu"
              className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent"
            >
              Full menu <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
        <span className="eyebrow text-primary">FAQ</span>
        <h2 className="mt-4 font-display text-4xl text-foreground">In-store parties</h2>
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
          <div className="flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            Ten seats. <span className="italic gold-text">Yours for the evening.</span>
          </h2>
          <Link
            to="/booking"
            search={{ service: "in-store" }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink hover:bg-[oklch(0.88_0.13_88)]"
          >
            Reserve your date <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
