import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="ink-panel relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28">
        {eyebrow ? (
          <div className="mb-6 flex items-center gap-4">
            <span className="gold-hairline w-14" aria-hidden />
            <span className="eyebrow text-accent">{eyebrow}</span>
          </div>
        ) : null}
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] text-cream">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-lg text-cream/70">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted ${aspect}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
          Photo placeholder
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground/70">
          Replace with client-owned image
        </span>
      </div>
    </div>
  );
}
