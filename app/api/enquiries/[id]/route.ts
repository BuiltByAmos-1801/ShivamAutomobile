import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { fail, ok, requireAdmin } from "../../_lib";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { status } = await req.json();
    const { id } = await params;
    return ok(await Enquiry.findByIdAndUpdate(id, { status }, { new: true }));
  } catch {
    return fail("Unable to update enquiry", 400);
  }
}
