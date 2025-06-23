import { getAccessToken } from "@/app/lib/getAccessToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();

    // 임시 : 개인 플레이리스트 출력
    const playlistId = "48AlewkJlCLDasGjfzcAoB";
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return NextResponse.json(data.items);
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "fail to random RecoList data" });
  }
}
