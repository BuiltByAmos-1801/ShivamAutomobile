import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadImage(dataUri: string, folder = "shivam-automobiles") {
  if (!process.env.CLOUDINARY_CLOUD_NAME) return dataUri;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }]
  });
  return result.secure_url;
}
