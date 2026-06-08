import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Book Service" };

export default function BookingPage() {
  return (
    <>
      <PageHero title="Book Vehicle Service" eyebrow="Workshop Booking">Choose a preferred date and describe the issue for faster workshop support.</PageHero>
      <section className="section"><div className="container-pad max-w-4xl"><Card><CardHeader><CardTitle>Service Booking</CardTitle></CardHeader><CardContent><BookingForm /></CardContent></Card></div></section>
    </>
  );
}
