import mongoose, { Schema, models } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager"], default: "admin" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default models.Admin || mongoose.model("Admin", adminSchema);
