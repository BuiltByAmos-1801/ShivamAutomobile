import mongoose, { Schema, models } from "mongoose";

const enquirySchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    customerName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    whatsappNumber: String,
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    chassisNumber: String,
    partName: { type: String, required: true },
    partNumber: String,
    notes: String,
    status: { type: String, enum: ["Pending", "Contacted", "Available", "Not Available", "Completed"], default: "Pending" }
  },
  { timestamps: true }
);

export default models.Enquiry || mongoose.model("Enquiry", enquirySchema);
