/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }
  try {
    let allTrackIds: string[] = [];

    const url = `https://api.spotify.com/v1/me/tracks`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const items = response.data.items;
    const ids = items.map((item: any) => item.track.id);
    allTrackIds = [...allTrackIds, ...ids];

    // let offset = 0;
    // let hasNext = true;
    // while (hasNext) {
    //   const url = `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`;
    //   const response = await axios.get(url, {
    //     headers: { Authorization: `Bearer ${access_token}` },
    //   });

    //   const items = response.data.items;
    //   const ids = items.map((item: any) => item.track.id);
    //   allTrackIds = [...allTrackIds, ...ids];

    //   if (items.length < 50) {
    //     hasNext = false;
    //   } else {
    //     offset += 50;
    //   }
    // }

    return NextResponse.json({ trackIds: allTrackIds });
  } catch (err: any) {
    console.log(
      "❌ 좋아요 트랙 가져오기 실패",
      err.response?.data || err.message
    );
    return NextResponse.json({ error: "Spotify API Error" }, { status: 500 });
  }
}
