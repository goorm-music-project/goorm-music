import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}
