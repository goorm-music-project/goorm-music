/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { searchParams } = new URL(req.url);
  const trackId = searchParams.get("trackId");

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const data = res.data[0];

    return NextResponse.json({ data });
  } catch (err: any) {
    console.log("❌ 좋아요 가져오기 실패", err.response?.data || err.message);
    return NextResponse.json({ error: "Spotify API Error" }, { status: 500 });
  }
}
