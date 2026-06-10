import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceTypes } from "@/lib/constants";

export const metadata = { title: "Garage Services" };

const serviceImages = [
  "/workshop/workshop-04.jpg",
  "/workshop/workshop-05.jpg",
  "/workshop/workshop-06.jpg",
  "/workshop/workshop-08.jpg",
  "/workshop/workshop-09.jpg",
  "/workshop/workshop-12.jpg"
];

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Garage Services" eyebrow="Workshop">Specialized Mahindra car maintenance, repair, diagnostics, and service booking support.</PageHero>
      <section className="section">
        <div className="container-pad">
          <div className="mb-8 grid gap-4 rounded-lg bg-zinc-950 p-5 text-white shadow-premium md:grid-cols-3">
            {([
              ["Diagnostics", Gauge],
              ["Genuine Parts", ShieldCheck],
              ["Expert Repair", Wrench]
            ] as const).map(([label, Icon]) => (
              <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-red-500/20 text-red-200"><Icon className="h-5 w-5" /></span>
                <span className="font-semibold">{String(label)}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service, index) => (
            <Card key={service}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-muted">
                <Image src={serviceImages[index % serviceImages.length]} alt={service} fill className="object-cover transition duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-950">Service {String(index + 1).padStart(2, "0")}</span>
              </div>
              <CardHeader><CardTitle>{service}</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Specialized Mahindra car workshop support with careful inspection, reliable parts, and clear status updates.</p>
                <Button asChild><Link href="/booking">Book Service <ArrowRight className="h-4 w-4" /></Link></Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
