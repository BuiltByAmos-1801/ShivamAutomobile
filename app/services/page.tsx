import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceTypes } from "@/lib/constants";

export const metadata = { title: "Garage Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Garage Services" eyebrow="Workshop">Expert maintenance, repair, diagnostics, and service booking support.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service, index) => (
            <Card key={service}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-muted">
                <Image src={`https://images.unsplash.com/photo-${index % 2 ? "1625047509248-ec889cbff17f" : "1487754180451-c456f719a1fc"}?q=80&w=900&auto=format&fit=crop`} alt={service} fill className="object-cover" />
              </div>
              <CardHeader><CardTitle>{service}</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Professional Mahindra workshop support with careful inspection, reliable parts, and clear status updates.</p>
                <Button asChild><Link href="/booking">Book Service</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
