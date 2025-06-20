import { getAccessToken } from "@/app/lib/getAccessToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAccessToken();

  // 임시 : 개인 플레이리스트 출력
  const playlistId = "48AlewkJlCLDasGjfzcAoB";
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error("Error:", res.status, error);
  }
  const data = await res.json();
  return NextResponse.json(data.items);
}
