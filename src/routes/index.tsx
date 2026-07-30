import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Flame,
  Leaf,
  PartyPopper,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { business, faqs, liveCounter, inStore, cateringPackages } from "@/lib/config";
import { Logo, logoUrl } from "@/components/site/logo";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dosa Ganesh — Live Dosa Catering & Counters in Melbourne" },
      {
        name: "description",
        content:
          "Melbourne's premium live dosa counter. Unlimited dosas, ten varieties, cooked in front of your guests — for weddings, parties and corporate events.",
      },
      { property: "og:title", content: "Dosa Ganesh — Live Dosa, Melbourne" },
      {
        property: "og:description",
        content:
          "A live dosa counter for your celebration. Unlimited, chef-cooked, ten varieties. Serving greater Melbourne.",
      },
      { property: "og:image", content: logoUrl },
      { name: "twitter:image", content: logoUrl },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* ============ HERO — cinematic noir ============ */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <video
            src="/videos/ganesh_dosa_2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-[50%_30%] sm:object-center"
            style={{ filter: "brightness(0.88) saturate(1.1)" }}
            aria-hidden
          />
          {/* Mobile: subtle bottom-up gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent sm:hidden" aria-hidden />
          {/* Desktop: soft left-side wash so text sits on darker area but video stays visible */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/20 to-transparent sm:block" aria-hidden />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/55 via-transparent to-transparent sm:block" aria-hidden />
        </div>

        {/* Top row: mobile logo center / desktop logo right */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-6 pt-10 sm:justify-end sm:px-10 sm:pt-12">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-accent/40 bg-cream/95 p-0.5 shadow-[0_10px_40px_-10px_oklch(0.82_0.14_88/0.5)] sm:h-16 sm:w-16">
            <img src={logoUrl} alt="Dosa Ganesh logo" className="h-full w-full rounded-full object-cover" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-6rem)] max-w-7xl flex-col justify-center px-6 pb-20 pt-8 sm:min-h-[calc(88vh-6rem)] sm:px-10 sm:pb-24 sm:pt-10">
          <div className="max-w-3xl">
            <div className="mb-5 hidden sm:block" aria-hidden />


            <h1 className="text-center font-display text-[clamp(2.4rem,8.5vw,6rem)] font-light leading-[0.98] text-cream sm:text-left sm:leading-[0.92]">
              Live Dosa.
              <br />
              <span className="italic text-cream/95">Freshly Made.</span>
              <br />
              <span className="gold-text">Made for your celebration.</span>
            </h1>

            <div className="mt-8 flex flex-col items-center gap-8 sm:mt-10 sm:items-start md:flex-row md:items-center md:gap-12">
              <p className="max-w-sm text-center text-[0.95rem] font-light leading-relaxed text-cream/75 sm:text-left sm:text-base sm:text-cream/70">
                Authentic live dosa catering across Melbourne — weddings,
                birthdays, corporate events and family celebrations.
              </p>

              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <Link
                  to="/booking"
                  className="group inline-flex h-12 items-center justify-center gap-2 bg-primary px-7 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cream shadow-[0_20px_60px_-20px_oklch(0.32_0.11_22/0.7)] transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-ink"
                >
                  Book a Live Counter
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  to="/catering"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-cream/30 px-7 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cream transition-colors hover:border-accent hover:text-accent"
                >
                  Explore Catering
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/15 pt-6 sm:mt-14 sm:divide-x sm:divide-cream/10 sm:gap-0 sm:pt-8">
              {[
                ["$20", "per person"],
                ["30–150", "guests"],
                ["10", "varieties"],
              ].map(([n, l]) => (
                <div key={l} className="text-center sm:px-6 sm:text-left sm:first:pl-0">
                  <dt className="font-display text-2xl font-light text-cream sm:text-3xl md:text-4xl">{n}</dt>
                  <dd className="eyebrow mt-1.5 text-[0.5rem] text-cream/50 sm:mt-2 sm:text-[0.55rem]">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
          <span className="eyebrow text-[0.55rem] text-accent">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" aria-hidden />
        </div>
      </section>


      {/* ============ MARQUEE ============ */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-8 sm:px-8">
          {[
            "Weddings",
            "Corporate Events",
            "Housewarmings",
            "Birthdays",
            "Community Gatherings",
            "Private Catering",
          ].map((t, i, arr) => (
            <span key={t} className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
              {t}
              {i < arr.length - 1 && <span className="h-1 w-1 rounded-full bg-accent/60" />}
            </span>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-primary">The Offering</span>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl">
              Three ways to bring
              <br />
              <span className="italic text-primary">dosa</span> to your event.
            </h2>
            <div className="gold-hairline mx-auto mt-8 w-24" aria-hidden />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-stretch">
            {[
              {
                icon: Flame,
                num: "01",
                title: "Live Dosa Counter",
                desc: "A chef arrives with a cast-iron tawa. Dosas are poured, folded and served hot to your guests — unlimited, all evening.",
                to: "/live-dosa-counter",
                price: `From $${liveCounter.pricePerPerson} / person`,
              },
              {
                icon: PartyPopper,
                num: "02",
                title: "In-Store Parties",
                desc: `Book out our venue for a small celebration. Unlimited dosas for ${inStore.baseGuests} guests from $${inStore.basePrice}.`,
                to: "/in-store-parties",
                price: `From $${inStore.basePrice}`,
              },
              {
                icon: Truck,
                num: "03",
                title: "Catering",
                desc: "Chef-designed catering trays delivered hot to your venue. Three tiers, all vegetarian, mostly gluten-free.",
                to: "/catering",
                price: "Three packages",
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="luxe-card group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-16px_oklch(0.32_0.11_22/0.18)]"
              >
                <div className="absolute right-6 top-6 font-display text-5xl text-accent/40 transition-all group-hover:text-accent">
                  {s.num}
                </div>
                <s.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-6 font-display text-3xl text-foreground">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="eyebrow text-[0.6rem] text-primary">{s.price}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-primary transition-all group-hover:bg-accent group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative bg-[oklch(0.94_0.025_85)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <span className="eyebrow text-primary">The Ritual</span>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
                From enquiry to the first
                <span className="italic gold-text"> crispy </span>
                dosa.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                We take the planning off your plate. Every event runs through the
                same four-step ritual — considered, unhurried, done properly.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                ["01", "Enquire", "Send your date, guest count and location — a note about the occasion helps."],
                ["02", "Confirm", "We reply within 24 hours with a quote, menu and secure deposit link."],
                ["03", "Prepare", "The batter is set to ferment. Staff, tawa, chutneys — all planned to your venue."],
                ["04", "Serve", "The tawa fires up. Unlimited dosas, on the spot, for as long as your guests want them."],
              ].map(([n, t, d]) => (
                <li key={n} className="group grid grid-cols-[auto_1fr] gap-6 border-b border-border pb-6 last:border-none">
                  <span className="font-display text-5xl italic text-accent">{n}</span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ PRICING HIGHLIGHT ============ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="ink-panel relative overflow-hidden rounded-3xl p-10 sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" aria-hidden />
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="text-cream">
                <span className="eyebrow text-accent">Live Counter Pricing</span>
                <h2 className="mt-4 font-display text-5xl leading-[1] sm:text-7xl">
                  <span className="gold-text">${liveCounter.pricePerPerson}</span>
                  <span className="text-cream/90"> per person.</span>
                  <br />
                  <span className="italic text-cream/70">Unlimited</span>{" "}
                  <span className="text-cream">dosas.</span>
                </h2>
                <p className="mt-6 max-w-lg text-cream/70">
                  Minimum {liveCounter.minGuests}, maximum {liveCounter.maxGuests} guests.
                  Ten dosa varieties, plus idli, medu vada and masala tea
                  (pending final confirmation).
                </p>
                <Link
                  to="/live-dosa-counter"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink hover:bg-[oklch(0.88_0.13_88)]"
                >
                  See what's included <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="space-y-4 border-l border-accent/25 pl-8">
                {liveCounter.inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-cream/85">
                    <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-[0.95rem]">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative pb-6 sm:pb-0">
              <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)] aspect-[4/5]">
                <img
                  src="/images/chef-team.jpg"
                  alt="Ganesh Dosa Melbourne chefs serving fresh dosas at a live counter"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" aria-hidden />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-accent/30 bg-background p-5 shadow-[var(--shadow-luxe)] sm:block">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-2 font-display text-2xl text-primary">Chef-led</p>
                <p className="eyebrow text-[0.6rem] text-muted-foreground">
                  Every event, always
                </p>
              </div>
            </div>
            <div>
              <span className="eyebrow text-primary">The Way Home Makes It</span>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl">
                South Indian,
                <br />
                <span className="italic gold-text">without shortcuts.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our batter is fermented for eighteen hours. Chutneys are ground
                fresh on the day. The tawa runs hot, the coffee runs strong.
                It's the dosa you remember — served the way it should be
                served: hot, off the pan, straight to the plate.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    [ChefHat, "Chef-led service"],
                    [Utensils, "Fresh · unlimited"],
                    [Flame, "Cooked to order"],
                    [Leaf, "Veg · mostly GF"],
                  ] as const
                ).map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-3 border-t border-border pt-4">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATERING PREVIEW ============ */}
      <section className="ink-panel py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-accent">Catering</span>
              <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
                Three packages,
                <br />
                <span className="italic gold-text">endless dosas.</span>
              </h2>
            </div>
            <Link
              to="/catering"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent hover:text-cream"
            >
              View all packages <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {cateringPackages.map((p, idx) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03] p-8 backdrop-blur transition-all hover:border-accent/40 hover:bg-cream/[0.06]"
              >
                <span className="eyebrow text-[0.6rem] text-accent/70">Tier 0{idx + 1}</span>
                <h3 className="mt-3 font-display text-3xl text-cream">{p.name}</h3>
                <p className="mt-2 text-sm italic text-cream/60">{p.tagline}</p>
                <div className="gold-hairline my-6 w-16" aria-hidden />
                <ul className="space-y-2.5 text-sm text-cream/80">
                  {p.items.slice(0, 4).map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-accent">◆</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============ SERVICE AREAS ============ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <span className="eyebrow text-primary">Where We Serve</span>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
                Greater
                <br />
                <span className="italic gold-text">Melbourne.</span>
              </h2>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Not sure if we come to you? Send us your postcode and we'll confirm — usually within the hour.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 self-center">
              {business.serviceAreas.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground/80 transition-colors hover:border-accent/60 hover:text-primary"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="text-center">
            <span className="eyebrow text-primary">Frequently Asked</span>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl">
              Small print,
              <br />
              <span className="italic gold-text">clearly answered.</span>
            </h2>
          </div>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {faqs.slice(0, 5).map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{f.q}</h3>
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-primary transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary hover:text-accent">
              All questions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="ink-panel relative overflow-hidden rounded-3xl p-12 text-center sm:p-20">
            <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-3xl" />
            </div>
            <div className="relative">
              <Logo size={80} className="mx-auto h-20 w-20 rounded-full ring-1 ring-accent/40 object-cover" />
              <h2 className="mt-8 font-display text-4xl leading-[1] text-cream sm:text-6xl">
                Let's plan your
                <br />
                <span className="italic gold-text">celebration.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-cream/70">
                WhatsApp us for the fastest reply, or send a booking enquiry —
                we respond to every one within 24 hours.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink hover:bg-[oklch(0.88_0.13_88)]"
                >
                  WhatsApp us
                </a>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cream hover:bg-cream/10"
                >
                  Booking form <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
