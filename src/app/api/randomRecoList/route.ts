import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const cookieAwait = await cookies();
    // const token = cookieAwait.get("access_token")?.value;
    const token = await getAccessToken();

    // 임시 : 개인 플레이리스트 출력
    const playlistId = "48AlewkJlCLDasGjfzcAoB";
    // const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
    // const playlistId = "37i9dQZF1DX3rxVfibe1L0";
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5`,
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
