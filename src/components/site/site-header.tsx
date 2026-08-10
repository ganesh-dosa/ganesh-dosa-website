import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business } from "@/lib/config";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/live-dosa-counter", label: "Live Counter" },
  { to: "/in-store-parties", label: "In-Store" },
  { to: "/catering", label: "Catering" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[0_1px_0_0_oklch(0.82_0.14_88/0.25)]"
          : "bg-background/40 backdrop-blur-sm",
      )}
    >
      {/* Gold hairline top */}
      <div className="gold-hairline w-full" aria-hidden />

      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 sm:px-8 sm:py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="Ganesh Dosa â€” Home"
        >
          <Logo size={56} className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 lg:h-20 lg:w-20" />
          <span className="block min-w-0">
            <span className="block font-display text-lg leading-none tracking-tight text-primary sm:text-2xl lg:text-4xl">
              {business.name}
            </span>
            <span className="eyebrow mt-1 block text-[0.5rem] text-muted-foreground sm:text-[0.6rem]">
              {business.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden justify-center gap-5 lg:flex xl:gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.13em] text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-primary hover:bg-accent/10 md:inline-flex"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            to="/booking"
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_oklch(0.32_0.11_22/0.6)] sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Book Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              activeProps={{ className: "bg-muted/80 text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-primary px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
          >
            Book an event
          </Link>
        </nav>
      </div>
    </header>
  );
}
