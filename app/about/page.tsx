import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { business } from "@/lib/constants";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Shivam Automobiles" eyebrow="Established 2017">Specialized Mahindra car workshop led by {business.owner}, serving Ranchi with dependable repairs and authorized spare parts.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-6 md:grid-cols-3">
          {[
            ["Mission", "Deliver accurate Mahindra car repairs, authorized parts, and timely workshop support."],
            ["Vision", "Become the most trusted Mahindra service and parts destination in the region."],
            ["Customer Commitment", "Clear communication, reliable diagnostics, and careful workmanship."]
          ].map(([title, text]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="text-muted-foreground">{text}</CardContent></Card>)}
        </div>
      </section>
      <section className="bg-muted py-14">
        <div className="container-pad">
          <h2 className="text-3xl font-bold">Timeline</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card><CardHeader><CardTitle>2017</CardTitle></CardHeader><CardContent>Shivam Automobiles begins specialized Mahindra car workshop and authorized spare parts operations.</CardContent></Card>
            <Card><CardHeader><CardTitle>Present</CardTitle></CardHeader><CardContent>Premium service, inventory support, bookings, and customer care under one roof.</CardContent></Card>
          </div>
        </div>
      </section>
    </>
  );
}
