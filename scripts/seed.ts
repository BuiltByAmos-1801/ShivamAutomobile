import bcrypt from "bcryptjs";
import "dotenv/config";
import { connectDb } from "../lib/db";
import Admin from "../models/Admin";
import Gallery from "../models/Gallery";
import Part from "../models/Part";
import Review from "../models/Review";
import Settings from "../models/Settings";

async function main() {
  await connectDb();
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";

  await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash: await bcrypt.hash(password, 12), role: "admin", active: true },
    { upsert: true }
  );

  await Settings.findOneAndUpdate({}, {}, { upsert: true });

  await Part.deleteMany({});
  await Part.insertMany([
    { name: "Mahindra Oil Filter", partNumber: "MHD-OF-001", category: "Filters", description: "Genuine oil filter for Mahindra vehicles.", price: 480, quantity: 24, images: [] },
    { name: "Brake Pad Set", partNumber: "MHD-BR-114", category: "Brake Parts", description: "Front brake pad set with reliable stopping performance.", price: 2450, quantity: 8, images: [] },
    { name: "Clutch Plate", partNumber: "MHD-CL-210", category: "Clutch Parts", description: "Durable clutch plate for smooth power transfer.", price: 4200, quantity: 4, images: [] },
    { name: "Air Filter", partNumber: "MHD-AF-302", category: "Filters", description: "Genuine engine air filter for cleaner intake.", price: 690, quantity: 18, images: [] },
    { name: "Suspension Bush Kit", partNumber: "MHD-SU-519", category: "Suspension Parts", description: "Workshop-grade suspension bush kit.", price: 1850, quantity: 3, images: [] }
  ]);

  await Review.deleteMany({});
  await Review.insertMany([
    { name: "Amit Kumar", rating: 5, review: "Fast service and genuine parts availability.", status: "Approved" },
    { name: "Rohit Singh", rating: 5, review: "Clear diagnosis and helpful workshop team.", status: "Approved" }
  ]);

  await Gallery.deleteMany({});
  await Gallery.insertMany([
    { title: "Workshop Area", album: "Workshop Images", imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop" },
    { title: "Parts Counter", album: "Spare Parts Shop", imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop" }
  ]);

  console.log(`Seed complete. Admin username: ${username}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
