import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { csv } from "@/lib/utils";
import { bookingSchema } from "@/lib/validators";
import Booking from "@/models/Booking";
import { fail, ok, pageParams, requireAdmin, upsertCustomer } from "../_lib";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    if (req.nextUrl.searchParams.get("export") === "csv") {
      const rows = await Booking.find().sort({ createdAt: -1 }).lean();
      return new NextResponse(csv(rows as Record<string, unknown>[]), { headers: { "Content-Type": "text/csv" } });
    }
    const { page, limit, skip } = pageParams(req);
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) query.$or = [{ customerName: new RegExp(search, "i") }, { phoneNumber: new RegExp(search, "i") }, { vehicleNumber: new RegExp(search, "i") }];
    const [items, total] = await Promise.all([Booking.find(query).sort({ preferredDate: 1 }).skip(skip).limit(limit), Booking.countDocuments(query)]);
    return ok({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function POST(req: NextRequest) {
  await connectDb();
  const body = bookingSchema.parse(await req.json());
  const customer = await upsertCustomer({
    name: body.customerName,
    mobileNumber: body.phoneNumber,
    vehicle: { name: body.vehicleName, number: body.vehicleNumber }
  });
  const booking = await Booking.create({ ...body, customer: customer._id });
  customer.bookingHistory.push(booking._id);
  await customer.save();
  return ok(booking, 201);
}
