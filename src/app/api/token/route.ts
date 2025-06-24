import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const code = body.code;

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
  const redirect_uri = "http://127.0.0.1:3000/callback";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
