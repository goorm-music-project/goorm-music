import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access_token = await getAccessToken();

  try {
    const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = res.data;
    return NextResponse.json(data);
  } catch (err) {
    console.log("앨범 데이터 출력 오류 ", err);
    return NextResponse.json({ err: "앨범 데이터 출력 오류" });
  }
}
