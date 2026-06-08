import mongoose, { Schema, models } from "mongoose";
import { partCategories } from "@/lib/constants";

const partSchema = new Schema(
  {
    name: { type: String, required: true, index: "text" },
    partNumber: { type: String, required: true, unique: true, index: true },
    category: { type: String, enum: partCategories, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    images: [String],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

partSchema.virtual("stockStatus").get(function () {
  if (this.quantity <= 0) return "Out of Stock";
  if (this.quantity <= this.lowStockThreshold) return "Low Stock";
  return "Available";
});

partSchema.set("toJSON", { virtuals: true });

export default models.Part || mongoose.model("Part", partSchema);
