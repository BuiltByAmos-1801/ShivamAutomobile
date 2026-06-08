import mongoose, { Schema, models } from "mongoose";

const vehicleSchema = new Schema(
  { name: String, model: String, number: String, chassisNumber: String },
  { _id: false }
);

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true, index: true },
    vehicles: [vehicleSchema],
    bookingHistory: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    enquiryHistory: [{ type: Schema.Types.ObjectId, ref: "Enquiry" }]
  },
  { timestamps: true }
);

export default models.Customer || mongoose.model("Customer", customerSchema);
