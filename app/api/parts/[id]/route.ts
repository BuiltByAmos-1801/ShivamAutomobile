import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { partSchema } from "@/lib/validators";
import Part from "@/models/Part";
import { fail, ok, requireAdmin } from "../../_lib";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { id } = await params;
    const part = await Part.findByIdAndUpdate(id, partSchema.partial().parse(await req.json()), { new: true });
    return ok(part);
  } catch {
    return fail("Unable to update part", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { id } = await params;
    await Part.findByIdAndUpdate(id, { active: false });
    return ok({ ok: true });
  } catch {
    return fail("Unable to delete part", 400);
  }
}
