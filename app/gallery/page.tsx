import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import Gallery from "@/models/Gallery";
import { connectDb } from "@/lib/db";

export const metadata = { title: "Gallery" };

const fallback = [
  ["Workshop Images", "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1000&auto=format&fit=crop"],
  ["Spare Parts Shop", "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop"],
  ["Customer Deliveries", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop"],
  ["Service Area", "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop"],
  ["Mahindra Workshop", "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1000&auto=format&fit=crop"]
];

export default async function GalleryPage() {
  await connectDb().catch(() => null);
  const images = await Gallery.find().sort({ createdAt: -1 }).lean().catch(() => []);
  const items = images.length ? images.map((i: any) => [i.album, i.imageUrl]) : fallback;
  return (
    <>
      <PageHero title="Workshop Gallery" eyebrow="Photos">Workshop, spare parts shop, service area, and delivery moments.</PageHero>
      <section className="section"><div className="container-pad grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(([album, src]) => <a key={src} href={src} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"><Image src={src} alt={album} fill className="object-cover transition group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-black/65 p-3 text-sm font-semibold text-white">{album}</span></a>)}</div></section>
    </>
  );
}
