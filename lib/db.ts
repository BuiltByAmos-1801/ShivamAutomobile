import mongoose from "mongoose";

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalForMongoose = globalThis as unknown as { mongooseCache?: Cached };
const cached = globalForMongoose.mongooseCache ?? { conn: null, promise: null };
globalForMongoose.mongooseCache = cached;

export async function connectDb() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is required.");
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(MONGODB_URI, { dbName: "shivam_automobiles" });
  cached.conn = await cached.promise;
  return cached.conn;
}
