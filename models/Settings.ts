import mongoose, { Schema, models } from "mongoose";
import { business } from "@/lib/constants";

const settingsSchema = new Schema(
  {
    businessName: { type: String, default: business.name },
    ownerName: { type: String, default: business.owner },
    address: { type: String, default: business.address },
    phone: { type: String, default: business.phone },
    email: { type: String, default: business.email },
    businessHours: { type: String, default: business.hours },
    whatsappNumber: { type: String, default: business.phone },
    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String
    }
  },
  { timestamps: true }
);

export default models.Settings || mongoose.model("Settings", settingsSchema);
