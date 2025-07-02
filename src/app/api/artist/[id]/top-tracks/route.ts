import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
};

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

    const tracks = res.data.tracks as SpotifyTrack[];

    return NextResponse.json(
      tracks.map((track) => ({
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
