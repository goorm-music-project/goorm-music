import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Genius from "genius-lyrics-api";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const trackId = context.params.id;

  try {
    const token = await getAccessToken();

    const trackRes = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const track = trackRes.data;
    const title = track.name;
    const artist = track.artists?.[0]?.name;
    const options = {
      apiKey: process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN!,
      title,
      artist,
      optimizeQuery: true,
    };
    const lyrics = await Genius.getLyrics(options);
    const song = await Genius.getSong(options);
    return NextResponse.json({
      title,
      artist,
      imageUrl: track.album?.images?.[0]?.url,
      lyrics,
      geniusUrl: song?.url || null,
    });
  } catch (err: any) {
    console.error(
      "트랙 상세 정보 조회 실패: ",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: "트랙 상세 정보 조회 실패" },
      { status: 500 }
    );
  }
}
