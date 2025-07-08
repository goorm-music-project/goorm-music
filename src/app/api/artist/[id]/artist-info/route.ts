import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access_token = (await cookies()).get("public_access_token")?.value;

  try {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = res.data;
    return NextResponse.json(data);
  } catch (err) {
    console.log("아티스트 정보 불러오기 오류", err);
    return NextResponse.json({ error: "아티스트 정보 불러오기 오류" });
  }
}
