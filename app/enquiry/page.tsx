import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Service Enquiry" };

export default function EnquiryPage() {
  return (
    <>
      <PageHero title="Service Enquiry" eyebrow="Workshop Support">Send your vehicle and service details. The team will confirm the next steps.</PageHero>
      <section className="section"><div className="container-pad max-w-4xl"><Card><CardHeader><CardTitle>Send Enquiry</CardTitle></CardHeader><CardContent><EnquiryForm /></CardContent></Card></div></section>
    </>
  );
}
