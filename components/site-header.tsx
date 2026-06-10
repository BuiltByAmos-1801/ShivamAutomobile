"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/constants";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Why Us", "/why-choose-us"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
      <div className="container-pad flex h-16 items-center justify-between">
        <Link href="/" className="group flex min-w-0 items-center gap-3 font-bold">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md bg-white shadow-sm shadow-red-900/20 ring-1 ring-border transition group-hover:-translate-y-0.5 group-hover:shadow-lg">
            <Image
              src="/shivamautomobile.jpg"
              alt="Shivam Automobiles logo"
              width={44}
              height={44}
              priority
              className="h-full w-full object-contain p-1"
            />
          </span>
          <span className="truncate text-base sm:text-lg">{business.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="relative transition hover:text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all hover:after:w-full">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" className="w-10 px-0" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 dark:hidden" /><Moon className="hidden h-4 w-4 dark:block" />
          </Button>
          <Button asChild className="hidden sm:inline-flex"><Link href="/booking">Book Service</Link></Button>
          <Button variant="outline" className="w-10 px-0 lg:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</Button>
        </div>
      </div>
      {open && (
        <nav className="container-pad grid animate-in slide-in-from-top-2 gap-2 border-t bg-background/96 py-4 text-sm font-medium shadow-sm lg:hidden">
          {links.map(([label, href]) => <Link key={href} href={href} className="rounded-md px-3 py-2 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/booking" className="rounded-md px-3 py-2 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>Book Service</Link>
          <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-muted hover:text-primary" onClick={() => setOpen(false)}>Admin</Link>
        </nav>
      )}
    </header>
  );
}
