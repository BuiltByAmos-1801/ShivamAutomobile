import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import Customer from "@/models/Customer";

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export function pageParams(req: NextRequest) {
  const page = Math.max(Number(req.nextUrl.searchParams.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.nextUrl.searchParams.get("limit") ?? 12), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
}

export async function requireAdmin(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) throw new Error("UNAUTHORIZED");
  return admin;
}

export async function upsertCustomer(input: {
  name: string;
  mobileNumber: string;
  vehicle?: { name?: string; model?: string; number?: string; chassisNumber?: string };
}) {
  await connectDb();
  return Customer.findOneAndUpdate(
    { mobileNumber: input.mobileNumber },
    {
      $setOnInsert: { name: input.name, mobileNumber: input.mobileNumber },
      ...(input.vehicle ? { $addToSet: { vehicles: input.vehicle } } : {})
    },
    { new: true, upsert: true }
  );
}
