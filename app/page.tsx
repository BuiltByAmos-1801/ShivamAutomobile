import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Gauge, PackageCheck, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MahindraLogo } from "@/components/mahindra-logo";
import { business } from "@/lib/constants";

const features = [
  ["Specialized Mahindra Car Workshop", ShieldCheck],
  ["Authorized Mahindra Spare Parts", PackageCheck],
  ["Expert Technicians", Wrench],
  ["Fast Diagnostics", Gauge]
];

const stats = [
  ["2019", "Serving Ranchi"],
  ["100%", "Mahindra Focus"],
  ["Fast", "Booking Support"]
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <Image src="/workshop/workshop-11.jpg" alt="Shivam Automobiles workshop exterior" fill priority className="hero-image-zoom object-cover opacity-[0.42]" />
        <div className="absolute inset-0 mesh-panel opacity-[0.25]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,.94),rgba(24,24,27,.58),rgba(9,9,11,.82))]" />
        <div className="container-pad relative grid min-h-[560px] items-center gap-8 py-12 sm:py-16 lg:min-h-[620px] lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div className="hero-reveal">
            <MahindraLogo className="mb-5 h-16 w-72 sm:h-[72px] sm:w-80" />
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-red-100 shadow-sm backdrop-blur sm:text-sm">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              {business.tagline}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">{business.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg sm:leading-8">Get authorized Mahindra spare parts, expert repairs, diagnostics, maintenance services and specialized Mahindra car workshop support under one roof.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link href="/services">View Services <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><Link href="/booking">Book Service</Link></Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><a href={`https://wa.me/${business.whatsapp}`}>WhatsApp Now</a></Button>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {stats.map(([value, label], index) => (
                <div key={label} className={`hero-reveal stagger-${index + 1} rounded-lg border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur`}>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-sm text-zinc-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="soft-glass grid gap-3 rounded-lg p-5">
            <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Workshop Ready</p>
                <h2 className="mt-1 text-2xl font-bold">Service confidence, built in.</h2>
              </div>
              <Clock3 className="h-8 w-8 text-yellow-300" />
            </div>
            {features.map(([label, Icon], index) => (
              <div key={String(label)} className={`hero-reveal stagger-${index + 1} flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-4 shadow-sm transition hover:bg-white/15`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-500/15 text-red-200"><Icon className="h-5 w-5" /></span>
                <span>{String(label)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-pad">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">What we handle</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Clean, dependable workshop care.</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">Transparent updates, quality parts, and focused Mahindra support for everyday service and urgent repairs.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Routine maintenance", "Dent paint repairs", "Insurance claim support"].map((title, index) => (
              <Card key={title}>
                <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <CheckCircle2 className={`mb-3 text-primary stagger-${index + 1}`} />
                  Premium workshop experience with transparent service updates and dependable support.
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["/workshop/workshop-04.jpg", "Workshop inspection"],
              ["/workshop/workshop-12.jpg", "Service bay"],
              ["/workshop/workshop-10.jpg", "Workshop entrance"]
            ].map(([src, alt]) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted shadow-premium">
                <Image src={src} alt={alt} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
