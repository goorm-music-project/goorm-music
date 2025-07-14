// 그대로 유지하되, lyrics 관련 부분 제거
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type SpotifyArtist = {
  id: string;
  name: string;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: {
    images: { url: string }[];
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("public_access_token")?.value;

  try {
    const trackRes = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const track = trackRes.data as SpotifyTrack;

    return NextResponse.json({
      title: track.name,
      artists: track.artists.map((artist) => artist.name),
      artistsId: track.artists.map((artist) => artist.id),
      imageUrl: track.album?.images?.[0]?.url,
    });
  } catch (err: unknown) {
    console.error("Spotify 트랙 조회 실패:", err);
    return NextResponse.json({ error: "트랙 조회 실패" }, { status: 500 });
  }
}
