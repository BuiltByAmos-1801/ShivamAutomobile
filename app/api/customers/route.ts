import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Customer from "@/models/Customer";
import { fail, ok, pageParams, requireAdmin } from "../_lib";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const { page, limit, skip } = pageParams(req);
    const search = req.nextUrl.searchParams.get("search");
    const query = search ? { $or: [{ name: new RegExp(search, "i") }, { mobileNumber: new RegExp(search, "i") }] } : {};
    const [items, total] = await Promise.all([
      Customer.find(query).populate("bookingHistory enquiryHistory").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Customer.countDocuments(query)
    ]);
    return ok({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return fail("Unauthorized", 401);
  }
}
