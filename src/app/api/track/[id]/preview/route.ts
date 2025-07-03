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

    const res = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      preview_url: res.data.preview_url,
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error(
        "트랙 상세 정보 조회 실패: ",
        err.response?.data || err.message
      );
    } else if (err instanceof Error) {
      console.error("트랙 상세 정보 조회 실패: ", err.message);
    } else {
      console.error("트랙 상세 정보 조회 실패: 알 수 없는 에러");
    }

    return NextResponse.json(
      { error: "트랙 상세 정보 조회 실패" },
      { status: 500 }
    );
  }
}
