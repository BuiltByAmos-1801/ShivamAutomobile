import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock3, MessageSquareText } from "lucide-react";

export const metadata = { title: "Book Service" };

export default function BookingPage() {
  return (
    <>
      <PageHero title="Book Vehicle Service" eyebrow="Workshop Booking">Choose a preferred date and describe the issue for faster workshop support.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-lg bg-zinc-950 p-6 text-white shadow-premium">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Fast lane</p>
            <h2 className="mt-2 text-3xl font-bold">Book once, arrive prepared.</h2>
            <div className="mt-6 grid gap-3 text-sm">
              {([
                ["Preferred slot", CalendarCheck],
                ["Quick confirmation", Clock3],
                ["Problem details saved", MessageSquareText]
              ] as const).map(([label, Icon]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3">
                  <Icon className="h-5 w-5 text-red-200" />
                  <span>{String(label)}</span>
                </div>
              ))}
            </div>
          </aside>
          <Card><CardHeader><CardTitle>Service Booking</CardTitle></CardHeader><CardContent><BookingForm /></CardContent></Card>
        </div>
      </section>
    </>
  );
}
