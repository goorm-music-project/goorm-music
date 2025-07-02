import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get("access_token")?.value;
  const refresh_token = (await cookieStore).get("refresh_token")?.value;

  if (!access_token && !refresh_token) {
    return NextResponse.json(
      { message: "No tokens available" },
      { status: 401 }
    );
  }

  if (access_token && !refresh_token) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  if (access_token && refresh_token) {
    return NextResponse.json({ message: "Tokens are valid" }, { status: 200 });
  }

  try {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

    const payload = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
      client_id,
      client_secret,
    });

    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      payload.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token: newAccessToken, expires_in } = res.data;

    const response = NextResponse.json({ success: true });

    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expires_in || 3600,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error(
      "🔴 Refresh token failed:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
