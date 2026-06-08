import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { adminCookie, ensureEnvAdmin, signAdminToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  await connectDb();
  await ensureEnvAdmin();
  const { username, password } = await req.json();
  const admin = await Admin.findOne({ username, active: true });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
  const token = signAdminToken(admin);
  const res = NextResponse.json({ token, admin: { username: admin.username, role: admin.role } });
  res.cookies.set(adminCookie(token));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("shivam_admin_token", "", { path: "/", maxAge: 0 });
  return res;
}
