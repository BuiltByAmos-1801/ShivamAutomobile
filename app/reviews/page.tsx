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
            {reviews.map((review: any) => <Card key={String(review._id)}><CardHeader><CardTitle>{review.name}</CardTitle></CardHeader><CardContent><p className="text-primary">{"★".repeat(review.rating)}</p><p className="mt-3 text-sm text-muted-foreground">{review.review}</p></CardContent></Card>)}
          </div>
          <Card><CardHeader><CardTitle>Submit Review</CardTitle></CardHeader><CardContent><ReviewForm /></CardContent></Card>
        </div>
      </section>
    </>
  );
}
