import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { partCategories } from "@/lib/constants";
import { currency } from "@/lib/utils";
import Part from "@/models/Part";
import { connectDb } from "@/lib/db";

export const metadata = { title: "Genuine Spare Parts" };

export default async function PartsPage({ searchParams }: { searchParams: Promise<{ search?: string; category?: string }> }) {
  await connectDb().catch(() => null);
  const sp = await searchParams;
  const query: Record<string, unknown> = { active: true };
  if (sp.category) query.category = sp.category;
  if (sp.search) query.$or = [{ name: new RegExp(sp.search, "i") }, { partNumber: new RegExp(sp.search, "i") }];
  const parts = await Part.find(query).sort({ createdAt: -1 }).limit(24).lean().catch(() => []);
  return (
    <>
      <PageHero title="Genuine Mahindra Spare Parts" eyebrow="Inventory">Search by part name, part number, category, and stock availability.</PageHero>
      <section className="section">
        <div className="container-pad">
          <form className="grid gap-3 md:grid-cols-[1fr_260px_auto]">
            <input name="search" placeholder="Search parts or part number" className="h-10 rounded-md border bg-background px-3" />
            <select name="category" className="h-10 rounded-md border bg-background px-3"><option value="">All Categories</option>{partCategories.map((c) => <option key={c}>{c}</option>)}</select>
            <button className="rounded-md bg-primary px-5 text-sm font-semibold text-white">Search</button>
          </form>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {parts.map((part: any) => (
              <Card key={String(part._id)}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-muted">
                  <Image src={part.images?.[0] || "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=900&auto=format&fit=crop"} alt={part.name} fill className="object-cover" />
                </div>
                <CardHeader><CardTitle>{part.name}</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>{part.description}</p>
                  <p className="font-semibold text-foreground">{part.partNumber} · {part.category}</p>
                  <p className="font-bold text-primary">{currency(part.price)} · {part.quantity > 0 ? "Available" : "Out of Stock"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
