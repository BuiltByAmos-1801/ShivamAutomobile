import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Part Availability Checker" };

export default function EnquiryPage() {
  return (
    <>
      <PageHero title="Part Availability Checker" eyebrow="Spare Parts">Send your vehicle and part details. The team will confirm availability and pricing.</PageHero>
      <section className="section"><div className="container-pad max-w-4xl"><Card><CardHeader><CardTitle>Send Enquiry</CardTitle></CardHeader><CardContent><EnquiryForm /></CardContent></Card></div></section>
    </>
  );
}
