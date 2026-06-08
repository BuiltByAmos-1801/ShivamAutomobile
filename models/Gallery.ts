import mongoose, { Schema, models } from "mongoose";

const gallerySchema = new Schema(
  {
    title: { type: String, required: true },
    album: { type: String, required: true },
    imageUrl: { type: String, required: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default models.Gallery || mongoose.model("Gallery", gallerySchema);
