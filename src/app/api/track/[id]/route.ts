import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Genius from "genius-lyrics-api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const trackId = id;

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
    const artists = track.artists?.map((artist: any) => artist.name);
    const artistsId = track.artists?.map((artist: any) => artist.id);
    const options = {
      apiKey: process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN!,
      title,
      artist: artists[0],
      optimizeQuery: true,
    };
    const lyrics = await Genius.getLyrics(options);
    const song = await Genius.getSong(options);
    return NextResponse.json({
      title,
      artists,
      imageUrl: track.album?.images?.[0]?.url,
      lyrics,
      artistsId,
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
