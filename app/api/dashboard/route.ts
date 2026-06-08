import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Booking from "@/models/Booking";
import Customer from "@/models/Customer";
import Enquiry from "@/models/Enquiry";
import Part from "@/models/Part";
import { fail, ok, requireAdmin } from "../_lib";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    await connectDb();
    const start = new Date();
    start.setMonth(start.getMonth() - 5);
    start.setDate(1);
    const [customers, bookings, enquiries, parts, lowStock, revenueParts, monthlyBookings, monthlyEnquiries] = await Promise.all([
      Customer.countDocuments(),
      Booking.countDocuments(),
      Enquiry.countDocuments(),
      Part.countDocuments({ active: true }),
      Part.countDocuments({ active: true, quantity: { $lte: 5 } }),
      Part.find({ active: true }).select("price quantity category").lean(),
      Booking.aggregate([{ $match: { createdAt: { $gte: start } } }, { $group: { _id: { $month: "$createdAt" }, total: { $sum: 1 } } }]),
      Enquiry.aggregate([{ $match: { createdAt: { $gte: start } } }, { $group: { _id: { $month: "$createdAt" }, total: { $sum: 1 } } }])
    ]);
    const inventoryValue = revenueParts.reduce((sum, part) => sum + Number(part.price) * Number(part.quantity), 0);
    const inventoryByCategory = revenueParts.reduce<Record<string, number>>((acc, part) => {
      acc[String(part.category)] = (acc[String(part.category)] ?? 0) + Number(part.quantity);
      return acc;
    }, {});
    return ok({ customers, bookings, enquiries, parts, lowStock, monthlyRevenue: inventoryValue, monthlyBookings, monthlyEnquiries, inventoryByCategory });
  } catch {
    return fail("Unauthorized", 401);
  }
}
