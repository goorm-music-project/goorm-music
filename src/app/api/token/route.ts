import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const code = body.code;

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
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
    const data = res.data;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(
      "Spotify 토큰 요청 실패: ",
      error.response?.data || error.message
    );

    return NextResponse.json(
      { error: "Failed to get access_token" },
      { status: 500 }
    );
  }
}
