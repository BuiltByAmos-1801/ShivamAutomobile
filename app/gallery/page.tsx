import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import Gallery from "@/models/Gallery";
import { connectDb } from "@/lib/db";

export const metadata = { title: "Gallery" };

const fallbackMedia = [
  { album: "Workshop Entrance", src: "/workshop/workshop-11.jpg", type: "image" },
  { album: "Service Bay", src: "/workshop/workshop-12.jpg", type: "image" },
  { album: "Dent Paint Work", src: "/workshop/workshop-01.jpg", type: "image" },
  { album: "Paint Booth Entry", src: "/workshop/workshop-02.jpg", type: "image" },
  { album: "Paint Booth Setup", src: "/workshop/workshop-03.jpg", type: "image" },
  { album: "Vehicle Inspection", src: "/workshop/workshop-04.jpg", type: "image" },
  { album: "Workshop Floor", src: "/workshop/workshop-05.jpg", type: "image" },
  { album: "Repair Area", src: "/workshop/workshop-06.jpg", type: "image" },
  { album: "Body Shop", src: "/workshop/workshop-07.jpg", type: "image" },
  { album: "Paint Preparation", src: "/workshop/workshop-08.jpg", type: "image" },
  { album: "Major Repair Bay", src: "/workshop/workshop-09.jpg", type: "image" },
  { album: "Customer Entry", src: "/workshop/workshop-10.jpg", type: "image" },
  { album: "Roadside View", src: "/workshop/workshop-13.jpg", type: "image" },
  { album: "Paint Booth", src: "/workshop/workshop-14.jpg", type: "image" },
  { album: "Paint Booth Interior", src: "/workshop/workshop-15.jpg", type: "image" },
  { album: "Booth Workspace", src: "/workshop/workshop-16.jpg", type: "image" },
  { album: "Booth Rear View", src: "/workshop/workshop-17.jpg", type: "image" },
  { album: "Workshop Booth", src: "/workshop/workshop-18.jpg", type: "image" },
  { album: "Workshop Video", src: "/IMG_4418.MOV", poster: "/workshop/workshop-11.jpg", type: "video" }
];

export default async function GalleryPage() {
  await connectDb().catch(() => null);
  const images = await Gallery.find().sort({ createdAt: -1 }).lean().catch(() => []);
  const items = images.length ? images.map((i: any) => ({ album: i.album, src: i.imageUrl, type: "image" })) : fallbackMedia;
  return (
    <>
      <PageHero title="Workshop Gallery" eyebrow="Photos">Workshop, office, service area, and delivery moments.</PageHero>
      <section className="section">
        <div className="container-pad">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Workshop moments</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Real spaces, real service work.</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">Explore the service bay, delivery moments, and workshop environment before you visit.</p>
          </div>
          <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, index) => {
              const className = `group relative overflow-hidden rounded-lg bg-muted shadow-premium ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`;

              if (item.type === "video") {
                return (
                  <div key={item.src} className={className}>
                    <video className="h-full w-full object-cover" controls muted playsInline preload="metadata" poster={item.poster}>
                    <source src={item.src} type="video/quicktime" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent opacity-90" />
                    <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-950">Video</span>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-lg font-bold text-white">{item.album}</span>
                  </div>
                );
              }

              return (
                <a key={item.src} href={item.src} className={className}>
                  <Image src={item.src} alt={item.album} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent opacity-90 transition group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-950">Gallery</span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-lg font-bold text-white">{item.album}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
