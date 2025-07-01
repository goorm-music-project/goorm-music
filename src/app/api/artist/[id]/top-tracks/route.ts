import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const artistId = params.id;
  try {
    const token = await getAccessToken();
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        params: { market: "KR" }, // 또는 'US' 등 원하는 국가 코드
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(
      res.data.tracks.map((track: any) => {
        return {
          imageUrl: track.album.images[0]?.url ?? "", // 가장 큰 이미지
          title: track.name,
          artists: track.artists.map((artist: any) => artist.name),
        };
      })
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
