import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { business } from "@/lib/constants";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a aria-label="WhatsApp Shivam Automobiles" href={`https://wa.me/${business.whatsapp}`} className="grid size-12 place-items-center rounded-full bg-green-600 text-white shadow-premium">
        <FaWhatsapp size={24} />
      </a>
      <a aria-label="Call Shivam Automobiles" href={`tel:${business.phone}`} className="grid size-12 place-items-center rounded-full bg-primary text-white shadow-premium">
        <Phone size={21} />
      </a>
    </div>
  );
}
