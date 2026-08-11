import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, Check, Info } from "lucide-react";
import { liveCounter } from "@/lib/config";
import { PageHeader, Section, SectionHeading, ImagePlaceholder } from "@/components/site/section";

export const Route = createFileRoute("/live-dosa-counter")({
  head: () => ({
    meta: [
      { title: "Live Dosa Counter Melbourne — Ganesh Dosa" },
      {
        name: "description",
        content:
          "$20 per person, unlimited dosas, live counter for 30–150 guests. Serving weddings, birthdays and corporate events across Melbourne.",
      },
    ],
  }),
  component: LiveCounterPage,
});

function minEventDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + liveCounter.leadTimeDays);
  return d.toISOString().slice(0, 10);
}

function LiveCounterPage() {
  const [guests, setGuests] = useState<number>(50);
  const [eventDate, setEventDate] = useState<string>("");

  const clampedGuests = Math.max(
    liveCounter.minGuests,
    Math.min(liveCounter.maxGuests, isNaN(guests) ? liveCounter.minGuests : guests),
  );
  const basePrice = clampedGuests * liveCounter.pricePerPerson;
  const minDate = useMemo(minEventDateISO, []);
  const dateInvalid = eventDate !== "" && eventDate < minDate;
  const guestInvalid =
    !isNaN(guests) && (guests < liveCounter.minGuests || guests > liveCounter.maxGuests);

  return (
    <>
      <PageHeader
        eyebrow="Live counter"
        title="Live Dosa Counter"
        intro={`Chef on-site, cast-iron tawa, unlimited dosas. $${liveCounter.pricePerPerson} per person for ${liveCounter.minGuests}–${liveCounter.maxGuests} guests.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading title="What's included" />
            <ul className="mt-6 space-y-3">
              {liveCounter.inclusions.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-accent/40 bg-accent/20 p-5">
              <p className="flex items-start gap-3 text-sm text-charcoal">
                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  Idli, medu vada and filter coffee inclusion is <strong>pending final client
                  confirmation</strong>. All other inclusions are locked in.
                </span>
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Per person" value={`$${liveCounter.pricePerPerson}`} />
              <Stat label="Guest range" value={`${liveCounter.minGuests}–${liveCounter.maxGuests}`} />
              <Stat label="Lead time" value={`${liveCounter.leadTimeDays} days`} />
            </div>
          </div>

          {/* Calculator */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-2xl text-primary">Live price calculator</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimate your base price. Add-ons quoted on enquiry.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="guests" className="text-sm font-medium">
                  Number of guests
                </label>
                <input
                  id="guests"
                  type="number"
                  min={liveCounter.minGuests}
                  max={liveCounter.maxGuests}
                  value={isNaN(guests) ? "" : guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none"
                />
                <input
                  type="range"
                  min={liveCounter.minGuests}
                  max={liveCounter.maxGuests}
                  value={clampedGuests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className="mt-3 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Min {liveCounter.minGuests}</span>
                  <span>Max {liveCounter.maxGuests}</span>
                </div>
                {guestInvalid ? (
                  <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Guest count must be between {liveCounter.minGuests} and {liveCounter.maxGuests}.
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="date" className="text-sm font-medium">
                  Event date
                </label>
                <input
                  id="date"
                  type="date"
                  min={minDate}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Earliest available: {minDate} · minimum {liveCounter.leadTimeDays} days · {liveCounter.recommendedLeadTimeDays}+ days recommended.
                </p>
                {dateInvalid ? (
                  <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Please choose a date at least {liveCounter.leadTimeDays} days from today.
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
                  Base price
                </p>
                <p className="mt-1 font-display text-4xl">
                  ${basePrice.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-primary-foreground/80">
                  {clampedGuests} guests × ${liveCounter.pricePerPerson}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Optional add-ons (quoted on enquiry)</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {liveCounter.addons.map((a) => (
                    <li key={a.id}>
                      · <span className="text-foreground">{a.label}</span> — {a.note}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/booking"
                search={{ service: "live-counter", guests: clampedGuests, date: eventDate || undefined }}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Continue to booking
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder label="Setup shot — live counter with chef and guests" />
          <div>
            <SectionHeading
              eyebrow="Working rules"
              title="A few things to know"
            />
            <ul className="mt-6 space-y-3 text-sm">
              <Rule>${liveCounter.pricePerPerson} per person, unlimited dosas.</Rule>
              <Rule>Minimum {liveCounter.minGuests} guests. Maximum {liveCounter.maxGuests}.</Rule>
              <Rule>{liveCounter.varieties} dosa varieties served on rotation.</Rule>
              <Rule>Idli, medu vada and filter coffee included.</Rule>
              <Rule>Book at least {liveCounter.leadTimeDays} days ahead ({liveCounter.recommendedLeadTimeDays}+ recommended).</Rule>
              <Rule>Free delivery within 10km; $30 one-way up to 100km from Melbourne CBD.</Rule>
              <Rule>20% deposit to confirm · full payment optional · secured by Stripe.</Rule>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl text-primary">{value}</p>
    </div>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
      <span>{children}</span>
    </li>
  );
}
