import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import Admin from "@/models/Admin";

const secret = process.env.JWT_SECRET ?? "development-only-secret";
const cookieName = "shivam_admin_token";

export async function ensureEnvAdmin() {
  await connectDb();
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  let admin = await Admin.findOne({ username });
  if (!admin) {
    admin = await Admin.create({ username, passwordHash: await bcrypt.hash(password, 12), role: "admin" });
  }
  return admin;
}

export function signAdminToken(admin: { _id: unknown; username: string; role: string }) {
  return jwt.sign({ id: String(admin._id), username: admin.username, role: admin.role }, secret, { expiresIn: "7d" });
}

export async function getAdminFromRequest(req?: NextRequest) {
  const header = req?.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, secret) as { id: string };
    await connectDb();
    return Admin.findById(payload.id).select("-passwordHash");
  } catch {
    return null;
  }
}

export function adminCookie(token: string) {
  return {
    name: cookieName,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}
