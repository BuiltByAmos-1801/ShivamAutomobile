import Image from "next/image";
import { Clock, PackageCheck, ShieldCheck, Smile, UserCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Why Choose Us" };

const features = [
  ["Specialized Mahindra Car Workshop", ShieldCheck],
  ["Authorized Mahindra Spare Parts", PackageCheck],
  ["Expert Technicians", UserCheck],
  ["Fast Service", Clock],
  ["Trusted Support", Smile],
  ["Online Booking", Wrench]
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero title="Why Choose Shivam Automobiles" eyebrow="Workshop Advantage">Reliable Mahindra car repairs, authorized spare parts, and customer-focused service since 2019.</PageHero>
      <section className="section">
        <div className="container-pad">
          <div className="mb-8 overflow-hidden rounded-lg bg-zinc-950 text-white shadow-premium">
            <div className="grid gap-0 md:grid-cols-[1fr_320px] md:items-stretch">
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Built for Mahindra owners</p>
                <h2 className="mt-2 text-3xl font-bold">A sharper workshop experience from entry to delivery.</h2>
              </div>
              <div className="relative min-h-[210px]">
                <Image src="/workshop/workshop-10.jpg" alt="Workshop customer entry" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-4xl font-bold">2019</p>
                  <p className="mt-1 text-sm text-zinc-200">Trusted service journey in Ranchi</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, Icon], index) => (
            <Card key={String(title)}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Advantage {String(index + 1).padStart(2, "0")}</span>
                </div>
                <CardTitle>{String(title)}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Premium workshop processes, careful diagnosis, and dependable follow-through for Mahindra car owners.</CardContent>
            </Card>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
