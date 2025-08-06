/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { trackId, isLiked } = await req.json();
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json({ error: "no token" }, { status: 401 });
  }

  try {
    const url = "https://api.spotify.com/v1/me/tracks";
    if (isLiked) {
      await axios.put(
        url,
        { ids: [trackId] },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
    } else {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${access_token}` },
        data: { ids: [trackId] },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log("❌ 좋아요 변경 실패", err.response?.data || err.message);
    return NextResponse.json({ error: "Spotify API Error" }, { status: 500 });
  }
}
