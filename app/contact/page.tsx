import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { business } from "@/lib/constants";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Shivam Automobiles" eyebrow="Ranchi">Call, WhatsApp, or visit the workshop during business hours.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Reach us</p>
              <CardTitle>Workshop Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <p className="flex gap-3 rounded-md bg-muted/70 p-3"><MapPin className="shrink-0 text-primary" />{business.address}</p>
              <p className="flex gap-3 rounded-md bg-muted/70 p-3"><Phone className="shrink-0 text-primary" />{business.phone}</p>
              <p className="flex gap-3 rounded-md bg-muted/70 p-3"><Mail className="shrink-0 text-primary" />{business.email}</p>
              <p className="rounded-md bg-muted/70 p-3">{business.hours}</p>
              <div className="flex gap-3"><Button asChild><a href={`tel:${business.phone}`}>Call Now</a></Button><Button asChild variant="outline"><a href={`https://wa.me/${business.whatsapp}`}>WhatsApp</a></Button></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Message</p>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4"><Input placeholder="Name" /><Input placeholder="Phone" /><Textarea placeholder="Message" /><Button>Send Message</Button></CardContent>
          </Card>
        </div>
        <div className="container-pad mt-8">
          <div className="overflow-hidden rounded-lg border bg-card p-2 shadow-premium">
            <iframe title="Google Map" className="h-80 w-full rounded-md" loading="lazy" src="https://www.google.com/maps?q=Chowk%2C%20Ranchi%20Ring%20Rd%2C%20Tilta%2C%20Ranchi%2C%20Jharkhand%20835222%2C%20India&output=embed" />
          </div>
        </div>
      </section>
    </>
  );
}
