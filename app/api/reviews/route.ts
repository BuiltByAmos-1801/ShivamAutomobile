import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { reviewSchema } from "@/lib/validators";
import Review from "@/models/Review";
import { fail, ok, pageParams, requireAdmin } from "../_lib";

export async function GET(req: NextRequest) {
  await connectDb();
  const { page, limit, skip } = pageParams(req);
  const admin = await requireAdmin(req).catch(() => null);
  const query = admin ? {} : { status: "Approved" };
  const [items, total] = await Promise.all([Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit), Review.countDocuments(query)]);
  return ok({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  await connectDb();
  const review = await Review.create(reviewSchema.parse(await req.json()));
  return ok(review, 201);
}
