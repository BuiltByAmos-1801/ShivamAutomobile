"use client";

import Link from "next/link";
import { Menu, Moon, Sun, Wrench } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/constants";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Why Us", "/why-choose-us"],
  ["Parts", "/parts"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur">
      <div className="container-pad flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Wrench size={18} /></span>
          <span>{business.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-primary">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="w-10 px-0" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="size-4 dark:hidden" /><Moon className="hidden size-4 dark:block" />
          </Button>
          <Button asChild className="hidden sm:inline-flex"><Link href="/booking">Book Service</Link></Button>
          <Button variant="outline" className="w-10 px-0 lg:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}><Menu size={18} /></Button>
        </div>
      </div>
      {open && (
        <nav className="container-pad grid gap-3 border-t py-4 text-sm font-medium lg:hidden">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/booking" onClick={() => setOpen(false)}>Book Service</Link>
          <Link href="/admin" onClick={() => setOpen(false)}>Admin</Link>
        </nav>
      )}
    </header>
  );
}
