import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access_token = (await cookies()).get("public_access_token")?.value;

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=KR&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await res.data.items;
    return NextResponse.json(data);
  } catch (err) {
    console.log("아티스트 앨범 불러오기 오류", err);
    return NextResponse.json({ err: "아티스트 앨범 불러오기 오류" });
  }
}
