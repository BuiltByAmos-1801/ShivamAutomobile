import { z } from "zod";
import { partCategories, serviceTypes } from "@/lib/constants";

export const partSchema = z.object({
  name: z.string().min(2),
  partNumber: z.string().min(2),
  category: z.enum(partCategories),
  description: z.string().min(5),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().int().min(0),
  images: z.array(z.string()).default([])
});

export const enquirySchema = z.object({
  customerName: z.string().min(2),
  mobileNumber: z.string().min(8),
  whatsappNumber: z.string().optional(),
  vehicleName: z.string().min(2),
  vehicleModel: z.string().min(1),
  chassisNumber: z.string().optional(),
  partName: z.string().min(2),
  partNumber: z.string().optional(),
  notes: z.string().optional()
});

export const bookingSchema = z.object({
  customerName: z.string().min(2),
  phoneNumber: z.string().min(8),
  vehicleName: z.string().min(2),
  vehicleNumber: z.string().min(2),
  serviceType: z.enum(serviceTypes),
  preferredDate: z.coerce.date(),
  preferredTime: z.string().min(1),
  problemDescription: z.string().min(5)
});

export const reviewSchema = z.object({
  name: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  review: z.string().min(5)
});
