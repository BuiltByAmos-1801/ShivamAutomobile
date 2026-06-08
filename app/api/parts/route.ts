import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { partSchema } from "@/lib/validators";
import Part from "@/models/Part";
import Inventory from "@/models/Inventory";
import { fail, ok, pageParams, requireAdmin } from "../_lib";

export async function GET(req: NextRequest) {
  await connectDb();
  const { page, limit, skip } = pageParams(req);
  const search = req.nextUrl.searchParams.get("search");
  const category = req.nextUrl.searchParams.get("category");
  const query: Record<string, unknown> = { active: true };
  if (category) query.category = category;
  if (search) query.$or = [{ name: new RegExp(search, "i") }, { partNumber: new RegExp(search, "i") }];
  const [items, total] = await Promise.all([
    Part.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Part.countDocuments(query)
  ]);
  return ok({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const body = partSchema.parse(await req.json());
    const part = await Part.create(body);
    await Inventory.create({ part: part._id, type: "IN", quantity: body.quantity, note: "Initial stock" });
    return ok(part, 201);
  } catch (error) {
    return fail(error instanceof Error && error.message === "UNAUTHORIZED" ? "Unauthorized" : "Unable to save part", error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 400);
  }
}
