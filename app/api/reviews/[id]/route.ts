import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Review from "@/models/Review";
import { fail, ok, requireAdmin } from "../../_lib";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { id } = await params;
    const { status } = await req.json();
    return ok(await Review.findByIdAndUpdate(id, { status }, { new: true }));
  } catch {
    return fail("Unable to update review", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { id } = await params;
    await Review.findByIdAndDelete(id);
    return ok({ ok: true });
  } catch {
    return fail("Unable to delete review", 400);
  }
}
