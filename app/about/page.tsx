import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { business } from "@/lib/constants";
import { Flag, Target, Users } from "lucide-react";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Shivam Automobiles" eyebrow="Established 2017">Specialized Mahindra car workshop led by {business.owner}, serving Ranchi with dependable repairs and authorized spare parts.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-6 md:grid-cols-3">
          {([
            ["Mission", "Deliver accurate Mahindra car repairs, authorized parts, and timely workshop support.", Target],
            ["Vision", "Become the most trusted Mahindra service and parts destination in the region.", Flag],
            ["Customer Commitment", "Clear communication, reliable diagnostics, and careful workmanship.", Users]
          ] as const).map(([title, text, Icon]) => (
            <Card key={String(title)}>
              <CardHeader>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                <CardTitle>{String(title)}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{String(text)}</CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-muted/70 py-14">
        <div className="container-pad">
          <div className="overflow-hidden rounded-lg bg-zinc-950 text-white shadow-premium">
            <div className="grid gap-0 lg:grid-cols-[.95fr_1.05fr]">
              <div className="relative min-h-[280px]">
                <Image src="/workshop/workshop-13.jpg" alt="Shivam Automobiles roadside workshop view" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/55 lg:hidden" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Our journey</p>
                <h2 className="mt-2 text-3xl font-bold">Timeline</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/10 p-5">
                    <p className="text-3xl font-bold">2017</p>
                    <p className="mt-3 text-sm text-zinc-200">Shivam Automobiles begins specialized Mahindra car workshop and authorized spare parts operations.</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/10 p-5">
                    <p className="text-3xl font-bold">Present</p>
                    <p className="mt-3 text-sm text-zinc-200">Premium service, inventory support, bookings, and customer care under one roof.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
