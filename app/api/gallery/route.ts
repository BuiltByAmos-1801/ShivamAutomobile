import { NextRequest } from "next/server";
import { z } from "zod";
import { uploadImage } from "@/lib/cloudinary";
import { connectDb } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { fail, ok, pageParams, requireAdmin } from "../_lib";

const gallerySchema = z.object({
  title: z.string().min(2),
  album: z.string().min(2),
  imageUrl: z.string().min(5),
  featured: z.boolean().optional()
});

export async function GET(req: NextRequest) {
  await connectDb();
  const { page, limit, skip } = pageParams(req);
  const album = req.nextUrl.searchParams.get("album");
  const query = album ? { album } : {};
  const [items, total] = await Promise.all([Gallery.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit), Gallery.countDocuments(query)]);
  return ok({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const body = gallerySchema.parse(await req.json());
    const imageUrl = await uploadImage(body.imageUrl, "shivam-automobiles/gallery");
    return ok(await Gallery.create({ ...body, imageUrl }), 201);
  } catch {
    return fail("Unable to save gallery image", 400);
  }
}
