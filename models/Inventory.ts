import mongoose, { Schema, models } from "mongoose";

const inventorySchema = new Schema(
  {
    part: { type: Schema.Types.ObjectId, ref: "Part", required: true },
    type: { type: String, enum: ["IN", "OUT", "ADJUSTMENT"], required: true },
    quantity: { type: Number, required: true },
    note: String
  },
  { timestamps: true }
);

export default models.Inventory || mongoose.model("Inventory", inventorySchema);
