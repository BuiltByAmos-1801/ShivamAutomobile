import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Inventory from "@/models/Inventory";
import Part from "@/models/Part";
import { fail, ok, pageParams, requireAdmin } from "../_lib";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { page, limit, skip } = pageParams(req);
    const [items, total, lowStock, outOfStock] = await Promise.all([
      Inventory.find().populate("part").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Inventory.countDocuments(),
      Part.countDocuments({ active: true, quantity: { $lte: 5, $gt: 0 } }),
      Part.countDocuments({ active: true, quantity: 0 })
    ]);
    return ok({ items, total, page, pages: Math.ceil(total / limit), lowStock, outOfStock });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { partId, type, quantity, note } = await req.json();
    const part = await Part.findById(partId);
    if (!part) return fail("Part not found", 404);
    part.quantity = type === "OUT" ? Math.max(0, part.quantity - quantity) : part.quantity + quantity;
    await part.save();
    return ok(await Inventory.create({ part: partId, type, quantity, note }), 201);
  } catch {
    return fail("Unable to update inventory", 400);
  }
}
