import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, isAdminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set on this deployment." },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const token = checkPassword(password);

  const url = new URL(req.url);
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login?error=1", url.origin), {
      status: 303,
    });
  }

  const res = NextResponse.redirect(new URL("/admin", url.origin), {
    status: 303,
  });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
