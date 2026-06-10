import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { business } from "@/lib/constants";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:right-5">
      <a aria-label="WhatsApp Shivam Automobiles" href={`https://wa.me/${business.whatsapp}`} className="grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white shadow-premium ring-4 ring-green-600/15 transition hover:-translate-y-0.5 hover:bg-green-500">
        <FaWhatsapp size={24} />
      </a>
      <a aria-label="Call Shivam Automobiles" href={`tel:${business.phone}`} className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-premium ring-4 ring-red-600/15 transition hover:-translate-y-0.5 hover:bg-red-700">
        <Phone size={21} />
      </a>
    </div>
  );
}
