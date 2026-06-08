import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    serviceType: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    problemDescription: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"], default: "Pending" }
  },
  { timestamps: true }
);

export default models.Booking || mongoose.model("Booking", bookingSchema);
