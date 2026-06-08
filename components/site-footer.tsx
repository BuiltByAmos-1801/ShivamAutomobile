import Link from "next/link";
import { business } from "@/lib/constants";
import { MahindraLogo } from "@/components/mahindra-logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-zinc-950 text-white">
      <div className="container-pad grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold">{business.name}</h2>
          <MahindraLogo className="mt-3" />
          <p className="mt-3 text-sm text-zinc-300">{business.tagline}</p>
        </div>
        <div className="text-sm text-zinc-300">
          <p>{business.address}</p>
          <p className="mt-2">{business.phone}</p>
          <p>{business.email}</p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/booking">Book Service</Link>
          <Link href="/admin">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
