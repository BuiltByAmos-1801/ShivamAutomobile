import Link from "next/link";
import { business } from "@/lib/constants";
import { MahindraLogo } from "@/components/mahindra-logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t bg-zinc-950 text-white">
      <div className="absolute inset-0 mesh-panel opacity-20" />
      <div className="absolute inset-0 bg-zinc-950/90" />
      <div className="container-pad relative grid gap-8 py-12 md:grid-cols-[1.15fr_1fr_.7fr]">
        <div>
          <h2 className="text-xl font-bold">{business.name}</h2>
          <MahindraLogo className="mt-4 h-12 w-52" />
          <p className="mt-3 text-sm text-zinc-300">{business.tagline}</p>
        </div>
        <div className="text-sm leading-6 text-zinc-300">
          <p>{business.address}</p>
          <p className="mt-2">{business.phone}</p>
          <p>{business.email}</p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link className="transition hover:text-red-200" href="/services">Services</Link>
          <Link className="transition hover:text-red-200" href="/booking">Book Service</Link>
          <Link className="transition hover:text-red-200" href="/admin">Admin Login</Link>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="container-pad flex flex-col justify-between gap-6 py-8 sm:flex-row sm:items-center">
          <div className="text-sm text-white">
            <div>© {new Date().getFullYear()} {business.name}. All rights reserved.</div>
          </div>
          <div className="text-center text-white">
            <div className="text-sm font-semibold">Developed by <Link href="https://builtbyamos.great-site.net/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition underline">Built By Amos</Link></div>
            <div className="mt-1 text-xs">Web Development & Design</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
