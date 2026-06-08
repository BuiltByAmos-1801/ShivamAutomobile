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
      <PageHero title="Why Choose Shivam Automobiles" eyebrow="Workshop Advantage">Reliable Mahindra car repairs, authorized spare parts, and customer-focused service since 2017.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, Icon]) => (
            <Card key={String(title)}>
              <CardHeader><Icon className="text-primary" /><CardTitle>{String(title)}</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Premium workshop processes, careful diagnosis, and dependable follow-through for Mahindra car owners.</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
