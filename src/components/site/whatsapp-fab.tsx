import { MessageCircle } from "lucide-react";
import { business } from "@/lib/config";

export function WhatsAppFab() {
  const href = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    "Hi Dosa Ganesh, I'd like to enquire about an event.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground shadow-[0_12px_30px_-10px_oklch(0.5_0.11_145/0.55)] transition-transform hover:-translate-y-0.5 lg:bottom-5 lg:right-5"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Contact us</span>
    </a>
  );
}
