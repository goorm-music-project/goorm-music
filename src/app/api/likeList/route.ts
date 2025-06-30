/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json({ error: "no token" }, { status: 401 });
  }

  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/tracks?limit=5",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = res.data.items;
    return NextResponse.json(data);
  } catch (err: any) {
    console.log("❌ 좋아요 리스트 실패", err.response?.data || err.message);
    return NextResponse.json({ error: "Spotify API Error" }, { status: 500 });
  }
}
