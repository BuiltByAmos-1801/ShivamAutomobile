import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
  },
  { timestamps: true }
);

export default models.Review || mongoose.model("Review", reviewSchema);
