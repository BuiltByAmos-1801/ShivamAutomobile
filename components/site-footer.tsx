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
      <div className="relative z-10 border-t border-white/15 bg-zinc-950/95">
        <div className="container-pad flex flex-col justify-between gap-6 py-8 text-white sm:flex-row sm:items-center">
          <div className="text-base font-semibold">
            <div>© {new Date().getFullYear()} {business.name}. All rights reserved.</div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-base font-semibold">Developed by <Link href="https://builtbyamos.great-site.net/" target="_blank" rel="noopener noreferrer" className="text-red-200 underline decoration-red-200/70 underline-offset-2 transition hover:text-white">Built By Amos</Link></div>
            <div className="mt-1 text-sm font-medium text-zinc-100">Web Development & Design</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
