import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const artistId = id;
  try {
    const token = await getAccessToken();
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        params: { market: "KR" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(
      res.data.tracks.map((track: any) => ({
        imageUrl: track.album.images[0]?.url ?? "",
        title: track.name,
        artists: track.artists.map((artist: any) => artist.name),
        trackId: track.id,
      }))
    );
  } catch (err: any) {
    console.error(
      "아티스트 Top 트랙 조회 실패: ",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: "아티스트 Top 트랙 조회 실패" },
      { status: 500 }
    );
  }
}
