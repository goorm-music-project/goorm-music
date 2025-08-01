import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const access_token = (await cookies()).get("public_access_token")?.value;

    // 최신 멜론차트 TOP 100 플레이리스트
    const playlistId = "7rLPjbAZIeK3aUCSbFlWo5";
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = res.data.items;
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: error });
  }
}
