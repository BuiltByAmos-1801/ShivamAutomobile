import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { csv } from "@/lib/utils";
import { enquirySchema } from "@/lib/validators";
import Enquiry from "@/models/Enquiry";
import { fail, ok, pageParams, requireAdmin, upsertCustomer } from "../_lib";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    if (req.nextUrl.searchParams.get("export") === "csv") {
      const rows = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return new NextResponse(csv(rows as Record<string, unknown>[]), { headers: { "Content-Type": "text/csv" } });
    }
    const { page, limit, skip } = pageParams(req);
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) query.$or = [{ customerName: new RegExp(search, "i") }, { mobileNumber: new RegExp(search, "i") }, { partName: new RegExp(search, "i") }];
    const [items, total] = await Promise.all([Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit), Enquiry.countDocuments(query)]);
    return ok({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function POST(req: NextRequest) {
  await connectDb();
  const body = enquirySchema.parse(await req.json());
  const customer = await upsertCustomer({
    name: body.customerName,
    mobileNumber: body.mobileNumber,
    vehicle: { name: body.vehicleName, model: body.vehicleModel, chassisNumber: body.chassisNumber }
  });
  const enquiry = await Enquiry.create({ ...body, customer: customer._id });
  customer.enquiryHistory.push(enquiry._id);
  await customer.save();
  return ok(enquiry, 201);
}
