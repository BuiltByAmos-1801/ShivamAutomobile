import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, PhoneCall, SearchCheck } from "lucide-react";

export const metadata = { title: "Service Enquiry" };

export default function EnquiryPage() {
  return (
    <>
      <PageHero title="Service Enquiry" eyebrow="Workshop Support">Send your vehicle and service details. The team will confirm the next steps.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-lg bg-zinc-950 p-6 text-white shadow-premium">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Part and service help</p>
            <h2 className="mt-2 text-3xl font-bold">Share details, get clearer guidance.</h2>
            <div className="mt-6 grid gap-3 text-sm">
              {([
                ["Vehicle info review", ClipboardList],
                ["Requirement check", SearchCheck],
                ["Team callback", PhoneCall]
              ] as const).map(([label, Icon]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3">
                  <Icon className="h-5 w-5 text-red-200" />
                  <span>{String(label)}</span>
                </div>
              ))}
            </div>
          </aside>
          <Card><CardHeader><CardTitle>Send Enquiry</CardTitle></CardHeader><CardContent><EnquiryForm /></CardContent></Card>
        </div>
      </section>
    </>
  );
}
