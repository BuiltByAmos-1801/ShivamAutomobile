import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Gauge, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { business } from "@/lib/constants";

const features = [
  ["Authorized Mahindra Workshop", ShieldCheck],
  ["Genuine Mahindra Parts", PackageCheck],
  ["Expert Technicians", Wrench],
  ["Fast Diagnostics", Gauge]
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <Image src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1800&auto=format&fit=crop" alt="Professional automobile workshop" fill priority className="object-cover opacity-35" />
        <div className="container-pad relative grid min-h-[620px] items-center gap-10 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="font-semibold text-red-300">{business.tagline}</p>
            <h1 className="mt-4 text-5xl font-bold sm:text-7xl">{business.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-200">Get genuine Mahindra spare parts, expert repairs, diagnostics, maintenance services and trusted workshop support under one roof.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link href="/enquiry">Check Part Availability</Link></Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><Link href="/booking">Book Service</Link></Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><a href={`https://wa.me/${business.whatsapp}`}>WhatsApp Now</a></Button>
            </div>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            {features.map(([label, Icon]) => <div key={String(label)} className="flex items-center gap-3"><Icon className="text-red-300" /><span>{String(label)}</span></div>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-pad">
          <div className="grid gap-4 md:grid-cols-3">
            {["Routine maintenance", "Spare parts inventory", "Customer-first support"].map((title) => (
              <Card key={title}>
                <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground"><CheckCircle2 className="mb-3 text-primary" /> Premium workshop experience with transparent service updates and dependable part availability.</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
