import { MessageCircle, Star } from "lucide-react";
import { ReviewForm } from "@/components/review-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Review from "@/models/Review";
import { connectDb } from "@/lib/db";

export const metadata = { title: "Customer Reviews" };

export default async function ReviewsPage() {
  await connectDb().catch(() => null);
  const reviews = await Review.find({ status: "Approved" }).sort({ createdAt: -1 }).limit(12).lean().catch(() => []);
  return (
    <>
      <PageHero title="Customer Reviews" eyebrow="Trust">Read approved customer feedback and submit your own review.</PageHero>
      <section className="section">
        <div className="container-pad grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.length ? reviews.map((review: any) => (
              <Card key={String(review._id)}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{review.name}</CardTitle>
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: Number(review.rating) || 0 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{review.review}</p>
                </CardContent>
              </Card>
            )) : (
              <Card className="md:col-span-2">
                <CardHeader><CardTitle>Customer stories coming soon</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">Submit the first review and help new visitors understand the workshop experience.</CardContent>
              </Card>
            )}
          </div>
          <Card><CardHeader><CardTitle>Submit Review</CardTitle></CardHeader><CardContent><ReviewForm /></CardContent></Card>
        </div>
      </section>
    </>
  );
}
