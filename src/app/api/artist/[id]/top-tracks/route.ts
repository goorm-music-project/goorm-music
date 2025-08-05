import { SpotifyTrack } from "@/domains/track/types/SpotifyTrack";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const artistId = id;
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");

  try {
    const access_token = (await cookies()).get("public_access_token")?.value;
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=KR`,
      {
        params: { market: "KR" },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const tracks = res.data.tracks as SpotifyTrack[];

    const censoredTracks = tracks.filter((track) => track.is_playable === true);

    if (mode === "allData") {
      return NextResponse.json(res.data.tracks);
    } else {
      return NextResponse.json(
        censoredTracks.map((track) => ({
          imageUrl: track.album.images[0]?.url ?? "",
          title: track.name,
          artists: track.artists.map((artist) => artist.name),
          trackId: track.id,
        }))
      );
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(
        "아티스트 Top 트랙 조회 실패: ",
        err.response?.data || err.message
      );
    } else if (err instanceof Error) {
      console.error("아티스트 Top 트랙 조회 실패: ", err.message);
    } else {
      console.error("아티스트 Top 트랙 조회 실패: 알 수 없는 에러");
    }
    return NextResponse.json(
      { error: "아티스트 Top 트랙 조회 실패" },
      { status: 500 }
    );
  }
}
