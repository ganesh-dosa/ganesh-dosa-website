import { Link } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Phone, CalendarHeart, Info } from "lucide-react";

type Tab = { to: "/" | "/menu" | "/booking" | "/about" | "/contact"; label: string; icon: typeof Home; primary?: boolean };
const tabs: Tab[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/booking", label: "Book", icon: CalendarHeart, primary: true },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="gold-hairline absolute inset-x-0 top-0" aria-hidden />
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2 py-2">
        {tabs.map((t) => (
          <li key={t.to} className="flex justify-center">
            <Link
              to={t.to}
              className="group relative flex flex-col items-center gap-1 px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-foreground/55 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {t.primary ? (
                <span className="mb-1 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_-8px_oklch(0.32_0.11_22/0.6)] ring-1 ring-accent/40">
                  <t.icon className="h-5 w-5" />
                </span>
              ) : (
                <t.icon className="h-5 w-5" />
              )}
              <span>{t.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
