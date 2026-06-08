import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Settings from "@/models/Settings";
import { fail, ok, requireAdmin } from "../_lib";

export async function GET() {
  await connectDb();
  const settings = (await Settings.findOne()) ?? (await Settings.create({}));
  return ok(settings);
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const settings = (await Settings.findOne()) ?? (await Settings.create({}));
    Object.assign(settings, await req.json());
    await settings.save();
    return ok(settings);
  } catch {
    return fail("Unable to update settings", 400);
  }
}
