import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { liveCounter, faqs, delivery, payments, cateringPackages } from "@/lib/config";

const searchSchema = z.object({
  service: z.enum(["live-counter", "in-store", "catering"]).optional(),
  package: z.string().optional(),
  guests: z.number().int().optional(),
  date: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book a Live Dosa Counter — Dosa Ganesh Melbourne" },
      {
        name: "description",
        content:
          "Design your event. Live dosa counter from $20 per person, 30–150 guests, unlimited dosas.",
      },
    ],
  }),
  component: BookingPage,
});

function minEventDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + liveCounter.leadTimeDays);
  return d.toISOString().slice(0, 10);
}

const extras: ReadonlyArray<{ id: string; label: string; note: string; price: number; unit: string }> = [
  { id: "cutlery", label: "Plates, cutlery, cups & glasses", note: "Compostable set per guest", price: 2, unit: "/ guest" },
];

const CATERING_MAX_GUESTS = 300;

const steps = ["Details", "Your info", "Payment"] as const;

function BookingPage() {
  const search = Route.useSearch();
  const minDate = useMemo(minEventDateISO, []);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const formSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // Fix: advancing/going back a step unmounts the button that was just
  // clicked. Some browsers reset scroll to the very top of the page when the
  // focused element disappears — scroll to the form section ourselves so the
  // new step's content lands under the header instead of the page hero.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const [service, setService] = useState(search.service ?? "live-counter");
  const [selectedPackage, setSelectedPackage] = useState(search.package ?? "package-1");
  const [guests, setGuests] = useState<number>(
    search.guests ?? Math.max(liveCounter.minGuests, 60),
  );
  const [eventDate, setEventDate] = useState(search.date ?? "");
  const [eventTime, setEventTime] = useState("18:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [suburb, setSuburb] = useState("");
  const [eventType, setEventType] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [payFull, setPayFull] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cateringPkg = cateringPackages.find((p) => p.id === selectedPackage) ?? cateringPackages[0];
  const pricePerPerson = service === "catering" ? cateringPkg.priceFrom : liveCounter.pricePerPerson;
  const effectiveMinGuests = service === "catering" ? cateringPkg.minGuests : liveCounter.minGuests;
  const effectiveMaxGuests = service === "catering" ? CATERING_MAX_GUESTS : liveCounter.maxGuests;

  const clampedGuests = Math.max(effectiveMinGuests, Math.min(effectiveMaxGuests, guests || 0));
  const basePrice = clampedGuests * pricePerPerson;
  const extrasTotal = extras.reduce((sum, e) => {
    if (!selectedExtras[e.id] || e.price === 0) return sum;
    return sum + (e.unit === "flat" ? e.price : e.price * clampedGuests);
  }, 0);
  const deliveryFee = distanceKm <= delivery.tier1RadiusKm ? delivery.tier1Charge : delivery.tier2Charge;
  const total = basePrice + extrasTotal + deliveryFee;
  const deposit = Math.round(total * (payments.depositPercent / 100));
  const amountDueNow = payFull ? total : deposit;

  const toggleExtra = (id: string) =>
    setSelectedExtras((s) => ({ ...s, [id]: !s[id] }));

  const validateStep0 = () => {
    const e: Record<string, string> = {};
    if (!eventDate) e.eventDate = `Pick a date at least ${liveCounter.leadTimeDays} days out.`;
    else if (service === "live-counter" && eventDate < minDate)
      e.eventDate = `Booking must be at least ${liveCounter.leadTimeDays} days from today (${liveCounter.recommendedLeadTimeDays}+ recommended).`;
    if (guests < effectiveMinGuests || guests > effectiveMaxGuests)
      e.guests = `Between ${effectiveMinGuests} and ${effectiveMaxGuests}.`;
    if (distanceKm > delivery.maxRadiusKm)
      e.distance = `We deliver within ${delivery.maxRadiusKm}km of Melbourne CBD.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateFinal = () => {
    const e: Record<string, string> = { ...errors };
    if (!name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email.";
    if (phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone.";
    if (!suburb.trim()) e.suburb = "Please enter your suburb.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateFinal()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          suburb,
          eventDate,
          eventTime,
          guests: clampedGuests,
          service,
          packageId: service === "catering" ? selectedPackage : undefined,
          pricePerPerson,
          eventType,
          notes,
          selectedExtras,
          distanceKm,
          payFull,
          total,
          amountDueNow,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unknown error" })) as { error?: string };
        throw new Error(data.error ?? "Checkout session creation failed");
      }

      const { url } = await res.json() as { url: string };
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      setSubmitError(err instanceof Error ? err.message : "Could not start checkout. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="ink-panel relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="flex items-center gap-4">
            <span className="gold-hairline w-14" aria-hidden />
            <span className="eyebrow text-accent">Booking · Live Dosa Counter</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] text-cream">
            Design your <span className="italic gold-text">celebration</span>.
          </h1>
          <p className="mt-5 max-w-xl text-cream/70">
            ${liveCounter.pricePerPerson} per person · {liveCounter.minGuests}–{liveCounter.maxGuests} guests ·
            unlimited dosas · {liveCounter.varieties} varieties. Book {liveCounter.recommendedLeadTimeDays}+ days ahead ({liveCounter.leadTimeDays}-day minimum).
          </p>

          {/* Progress */}
          <ol className="mt-12 flex flex-wrap items-center gap-3 text-cream/70">
            {steps.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border text-[0.72rem] font-semibold ${
                      active
                        ? "border-accent bg-accent text-ink"
                        : done
                          ? "border-accent/60 bg-accent/20 text-accent"
                          : "border-cream/20 text-cream/60"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className={`eyebrow text-[0.65rem] ${active ? "text-accent" : ""}`}>{s}</span>
                  {i < steps.length - 1 && <ChevronRight className="hidden h-4 w-4 text-cream/30 sm:block" />}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* MAIN */}
      <section ref={formSectionRef} className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          {/* Left column: steps */}
          <form onSubmit={submit} className="space-y-10">
            {step === 0 && (
              <>
                {/* Service */}
                <Card>
                  <CardTitle eyebrow="Step 01" title="Service" />
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {(
                      [
                        ["live-counter", "Dosa Live Counter", "Chef on-site"],
                        ["in-store", "In-Store Party", "At our venue"],
                        ["catering", "Catering", "Delivered"],
                      ] as const
                    ).map(([v, l, sub]) => (
                      <label
                        key={v}
                        className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                          service === v
                            ? "border-primary bg-primary/[0.03] shadow-[0_0_0_1px_var(--primary)]"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={v}
                          checked={service === v}
                          onChange={() => setService(v)}
                          className="sr-only"
                        />
                        <p className="font-display text-xl text-foreground">{l}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Catering package selector */}
                {service === "catering" && (
                  <Card>
                    <CardTitle eyebrow="Step 01b" title="Catering Package" />
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {cateringPackages.map((p) => (
                        <label
                          key={p.id}
                          className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                            selectedPackage === p.id
                              ? "border-primary bg-primary/[0.03] shadow-[0_0_0_1px_var(--primary)]"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="package"
                            value={p.id}
                            checked={selectedPackage === p.id}
                            onChange={() => setSelectedPackage(p.id)}
                            className="sr-only"
                          />
                          <p className="font-display text-xl text-foreground">{p.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                          <p className="mt-3 font-display text-lg text-primary">${p.priceFrom}/pp</p>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Guests */}
                <Card>
                  <CardTitle eyebrow="Step 02" title="Guest count" />
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(effectiveMinGuests, (g || 0) - 5))}
                      className="grid h-12 w-12 place-items-center rounded-full border border-border text-primary hover:border-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex flex-1 items-baseline justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-display text-5xl text-primary">{clampedGuests}</span>
                      <span className="text-sm text-muted-foreground">guests</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(effectiveMaxGuests, (g || 0) + 5))}
                      className="grid h-12 w-12 place-items-center rounded-full border border-border text-primary hover:border-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="range"
                    min={effectiveMinGuests}
                    max={effectiveMaxGuests}
                    step={5}
                    value={clampedGuests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    className="mt-6 w-full accent-primary"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Min {effectiveMinGuests}</span>
                    <span>Max {effectiveMaxGuests}</span>
                  </div>
                  {errors.guests && <FieldError>{errors.guests}</FieldError>}
                </Card>

                {/* Date */}
                <Card>
                  <CardTitle eyebrow="Step 03" title="Event date & time" />
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="eyebrow text-[0.65rem] text-muted-foreground">Date</span>
                      <div className="mt-2 flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        <input
                          type="date"
                          min={minDate}
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="eyebrow text-[0.65rem] text-muted-foreground">Time</span>
                      <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Earliest available: {minDate} · minimum {liveCounter.leadTimeDays} days · we recommend {liveCounter.recommendedLeadTimeDays}+ days for weekends & weddings.
                  </p>
                  {errors.eventDate && <FieldError>{errors.eventDate}</FieldError>}
                </Card>

                {/* Distance / delivery */}
                <Card>
                  <CardTitle eyebrow="Step 04" title="Venue distance" />
                  <p className="mt-2 text-sm text-muted-foreground">{delivery.note}</p>
                  <label className="mt-6 block">
                    <span className="eyebrow text-[0.65rem] text-muted-foreground">Distance from venue (km, approx)</span>
                    <input
                      type="number"
                      min={0}
                      max={delivery.maxRadiusKm}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Math.max(0, parseInt(e.target.value || "0", 10)))}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                    />
                  </label>
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-muted/40 p-4">
                    <span className="text-sm">
                      {distanceKm <= delivery.tier1RadiusKm
                        ? `Within ${delivery.tier1RadiusKm}km — $${delivery.tier1Charge} delivery`
                        : `Beyond ${delivery.tier1RadiusKm}km — $${delivery.tier2Charge} delivery`}
                    </span>
                    <span className="font-display text-lg text-primary">
                      +${deliveryFee}
                    </span>
                  </div>
                  {errors.distance && <FieldError>{errors.distance}</FieldError>}
                </Card>

                {/* Extras */}
                <Card>
                  <CardTitle eyebrow="Step 05" title="Extras" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional. Add or remove — your estimate updates live.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {extras.map((e) => {
                      const on = !!selectedExtras[e.id];
                      return (
                        <li key={e.id}>
                          <button
                            type="button"
                            onClick={() => toggleExtra(e.id)}
                            className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all ${
                              on ? "border-primary bg-primary/[0.04]" : "border-border hover:border-primary/40"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span
                                className={`grid h-6 w-6 place-items-center rounded-md border transition ${
                                  on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                                }`}
                              >
                                {on && <Check className="h-4 w-4" />}
                              </span>
                              <div>
                                <p className="font-medium text-foreground">{e.label}</p>
                                <p className="text-xs text-muted-foreground">{e.note}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-display text-lg text-primary">
                                {e.price === 0 ? "POA" : `$${e.price}`}
                              </p>
                              <p className="eyebrow text-[0.55rem] text-muted-foreground">{e.unit}</p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Card>

                <div className="hidden justify-end lg:flex">
                  <button
                    type="button"
                    onClick={() => validateStep0() && setStep(1)}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
                  >
                    Continue <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}


            {step === 1 && (
              <>
                <Card>
                  <CardTitle eyebrow="Step 02" title="Your details" />
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <FieldInput label="Full name" value={name} onChange={setName} error={errors.name} />
                    <FieldInput label="Email" type="email" value={email} onChange={setEmail} error={errors.email} />
                    <FieldInput label="Phone" type="tel" value={phone} onChange={setPhone} error={errors.phone} />
                    <FieldInput label="Suburb & postcode" value={suburb} onChange={setSuburb} error={errors.suburb} />
                    <label className="block sm:col-span-2">
                      <span className="eyebrow text-[0.65rem] text-muted-foreground">Event type</span>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                      >
                        <option value="">Select…</option>
                        <option>Birthday party</option>
                        <option>Family celebration</option>
                        <option>Housewarming</option>
                        <option>Wedding / pre-wedding</option>
                        <option>Community event</option>
                        <option>Corporate event</option>
                        <option>School / university</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="eyebrow text-[0.65rem] text-muted-foreground">Special requests</span>
                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value.slice(0, 1000))}
                        placeholder="Venue notes, dietary requirements, timings…"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                      />
                    </label>
                  </div>
                </Card>

                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateFinal()) setStep(2);
                    }}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to payment <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Card>
                  <CardTitle eyebrow="Step 03" title="Secure payment via Stripe" />
                  <p className="mt-2 text-sm text-muted-foreground">{payments.note}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <label
                      className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                        !payFull ? "border-primary bg-primary/[0.04] shadow-[0_0_0_1px_var(--primary)]" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input type="radio" name="pay" checked={!payFull} onChange={() => setPayFull(false)} className="sr-only" />
                      <p className="eyebrow text-[0.6rem] text-primary">{payments.depositPercent}% Deposit</p>
                      <p className="mt-2 font-display text-3xl text-primary">${deposit.toLocaleString()}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Balance due 48h before event</p>
                    </label>
                    <label
                      className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                        payFull ? "border-primary bg-primary/[0.04] shadow-[0_0_0_1px_var(--primary)]" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input type="radio" name="pay" checked={payFull} onChange={() => setPayFull(true)} className="sr-only" />
                      <p className="eyebrow text-[0.6rem] text-primary">Pay in full</p>
                      <p className="mt-2 font-display text-3xl text-primary">${total.toLocaleString()}</p>
                      <p className="mt-1 text-xs text-muted-foreground">No balance later</p>
                    </label>
                  </div>
                  <div className="mt-5 rounded-2xl border border-dashed border-accent/50 bg-accent/10 p-5">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-[0.65rem] text-primary">Amount due now</span>
                      <span className="font-display text-3xl text-primary">${amountDueNow.toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-xs text-charcoal/70">
                      You'll receive an SMS confirmation with your booking details. Card payments processed securely by Stripe.
                    </p>
                  </div>
                </Card>

                <div className="lg:hidden">
                  <MobileEstimateCard
                    total={total}
                    clampedGuests={clampedGuests}
                    pricePerPerson={pricePerPerson}
                    basePrice={basePrice}
                    extrasTotal={extrasTotal}
                    deliveryFee={deliveryFee}
                    amountDueNow={amountDueNow}
                    payFull={payFull}
                  />
                </div>

                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_20px_60px_-20px_oklch(0.32_0.11_22/0.6)] hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing…" : "Confirm & Pay"} <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                {submitError && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> {submitError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  By submitting you agree to our{" "}
                  <Link to="/privacy" className="underline hover:text-primary">Privacy</Link>,{" "}
                  <Link to="/booking-policy" className="underline hover:text-primary">Booking</Link> and{" "}
                  <Link to="/cancellation-policy" className="underline hover:text-primary">Cancellation</Link> policies.
                </p>
              </>
            )}
          </form>

          {/* Right column: sticky summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="ink-panel overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-luxe)]">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="eyebrow text-[0.6rem] text-accent">Live estimate</span>
              </div>
              <p className="mt-4 font-display text-6xl text-cream">
                <span className="gold-text">${total.toLocaleString()}</span>
              </p>
              <p className="mt-2 text-xs text-cream/60">
                {clampedGuests} guests · ${pricePerPerson}/pp
                {extrasTotal > 0 && ` + $${extrasTotal.toLocaleString()} extras`}
              </p>

              <div className="gold-hairline my-6" aria-hidden />

              <dl className="space-y-3 text-sm text-cream/85">
                <Row label="Service" value={service.replace("-", " ")} />
                <Row label="Guests" value={String(clampedGuests)} />
                <Row label="Date" value={eventDate || "—"} />
                <Row label="Time" value={eventTime || "—"} />
                <Row label="Base" value={`$${basePrice.toLocaleString()}`} />
                {extras.filter((e) => selectedExtras[e.id]).map((e) => (
                  <Row
                    key={e.id}
                    label={e.label}
                    value={e.price === 0 ? "POA" : e.unit === "flat" ? `$${e.price}` : `$${e.price * clampedGuests}`}
                    subtle
                  />
                ))}
                <Row label="Delivery" value={deliveryFee ? `$${deliveryFee}` : "Free"} subtle />
              </dl>

              <div className="mt-6 rounded-2xl border border-accent/25 bg-cream/5 p-4">
                <p className="eyebrow text-[0.6rem] text-accent">
                  {payFull ? "Pay in full" : `Deposit (${payments.depositPercent}%)`}
                </p>
                <p className="mt-1 font-display text-3xl text-cream">${amountDueNow.toLocaleString()}</p>
                <p className="mt-1 text-[0.65rem] text-cream/60">Secure payment via Stripe</p>
              </div>

              <ul className="mt-6 space-y-2 text-xs text-cream/60">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> Unlimited dosas</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> {liveCounter.varieties} varieties</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> Chef & staff included</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> {liveCounter.recommendedLeadTimeDays}-day recommended lead</li>
              </ul>
            </div>
          </aside>
        </div>

        {step === 0 && (
          <div className="mt-6 flex justify-end lg:hidden">
            <button
              type="button"
              onClick={() => validateStep0() && setStep(1)}
              className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
            >
              Continue <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-8 sm:pb-32">
        <span className="eyebrow text-primary">FAQ</span>
        <h2 className="mt-4 font-display text-4xl text-foreground">Before you book</h2>
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
    </>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-border bg-card p-7 sm:p-9 shadow-[0_1px_0_oklch(1_0_0/0.8)_inset,0_20px_40px_-30px_oklch(0.2_0.05_30/0.15)]">{children}</div>;
}

function CardTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="eyebrow text-[0.6rem] text-primary/70">{eyebrow}</span>
      <h2 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-[0.65rem] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 200))}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
      <AlertCircle className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function Row({ label, value, subtle }: { label: string; value: string; subtle?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${subtle ? "text-cream/60" : ""}`}>
      <dt className="capitalize">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function MobileEstimateCard({
  total,
  clampedGuests,
  pricePerPerson,
  basePrice,
  extrasTotal,
  deliveryFee,
  amountDueNow,
  payFull,
}: {
  total: number;
  clampedGuests: number;
  pricePerPerson: number;
  basePrice: number;
  extrasTotal: number;
  deliveryFee: number;
  amountDueNow: number;
  payFull: boolean;
}) {
  return (
    <div className="ink-panel rounded-3xl p-6 shadow-[var(--shadow-luxe)]">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="eyebrow text-[0.6rem] text-accent">Live estimate</span>
      </div>
      <p className="mt-3 font-display text-5xl">
        <span className="gold-text">${total.toLocaleString()}</span>
      </p>
      <p className="mt-1 text-xs text-cream/60">
        {clampedGuests} guests · ${pricePerPerson}/pp
        {extrasTotal > 0 && ` · +$${extrasTotal} extras`}
        {deliveryFee > 0 && ` · +$${deliveryFee} delivery`}
      </p>
      <div className="gold-hairline my-5" aria-hidden />
      <dl className="space-y-2 text-sm text-cream/85">
        <Row label="Base" value={`$${basePrice.toLocaleString()}`} />
        <Row label="Extras" value={extrasTotal ? `$${extrasTotal.toLocaleString()}` : "—"} subtle />
        <Row label="Delivery" value={deliveryFee ? `$${deliveryFee}` : "Free"} subtle />
      </dl>
      <div className="mt-5 rounded-2xl border border-accent/25 bg-cream/5 p-4">
        <p className="eyebrow text-[0.6rem] text-accent">
          {payFull ? "Pay in full" : `Deposit (${payments.depositPercent}%)`}
        </p>
        <p className="mt-1 font-display text-2xl text-cream">${amountDueNow.toLocaleString()}</p>
      </div>
    </div>
  );
}

