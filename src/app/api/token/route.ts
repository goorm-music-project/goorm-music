import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const code = body.code;

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirect_uri = "http://127.0.0.1:3000/callback";
  const payload = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id,
    client_secret,
  });

  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      payload.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = res.data;

    const response = NextResponse.json({ success: true });

    const ONE_HOUR = 60 * 60;

    const isDev = process.env.NODE_ENV === "development";

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: !isDev,
      path: "/",
      maxAge: expires_in || ONE_HOUR,
      sameSite: "lax",
    });

    response.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: !isDev,
      path: "/",
      maxAge: ONE_HOUR * 24 * 30,
      sameSite: "lax",
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Spotify 토큰 요청 실패: ",
        error.response?.data || error.message
      );
    } else {
      console.error("알 수 없는 에러 발생: ", error);
    }

    return NextResponse.json(
      { error: "Failed to get access_token" },
      { status: 500 }
    );
  }
}
