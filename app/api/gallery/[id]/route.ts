import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { fail, ok, requireAdmin } from "../../_lib";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { id } = await params;
    await Gallery.findByIdAndDelete(id);
    return ok({ ok: true });
  } catch {
    return fail("Unable to delete image", 400);
  }
}
