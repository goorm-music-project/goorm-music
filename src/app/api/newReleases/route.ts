import { getAccessToken } from "@/app/lib/getAccessToken";
import { NextResponse } from "next/server";

export async function GET() {
  const access_token = await getAccessToken();
  const res = await fetch(
    "https://api.spotify.com/v1/browse/new-releases?limit=10",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data.albums.items); // 앨범 목록만 응답
}
