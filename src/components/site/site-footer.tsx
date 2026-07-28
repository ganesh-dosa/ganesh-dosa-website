import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/config";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="ink-panel mt-24 relative overflow-hidden">
      <div className="gold-hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={64} className="h-16 w-16 rounded-md bg-cream object-contain p-1" />
            <div>
              <p className="font-display text-2xl text-cream">{business.name}</p>
              <p className="eyebrow mt-1 text-[0.6rem] text-accent">Melbourne</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
            A cast-iron tawa, a chef, and unlimited dosas served fresh in front
            of your guests. Live dosa counters and catering across greater
            Melbourne.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/live-dosa-counter", "Live Dosa Counter"],
              ["/in-store-parties", "In-Store Parties"],
              ["/catering", "Catering"],
              ["/menu", "Menu"],
              ["/gallery", "Gallery"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-cream/75 transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/about", "About"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/booking", "Book an Event"],
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
              ["/booking-policy", "Booking Policy"],
              ["/cancellation-policy", "Cancellation"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-cream/75 transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-cream/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{business.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {business.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${business.email}`} className="hover:text-accent">
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={business.instagram} className="hover:text-accent" target="_blank" rel="noreferrer">
                @ganesh_dosa_melbourne
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={business.facebook} className="hover:text-accent" target="_blank" rel="noreferrer">
                Ganesh Dosa Melbourne
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {business.name}. Crafted with care in Melbourne.
          </p>
          <p className="text-xs text-cream/40">Made with perfection. Served with love.</p>
        </div>
      </div>
    </footer>
  );
}
