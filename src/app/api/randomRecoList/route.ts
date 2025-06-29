import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();

    const playlistId = "48AlewkJlCLDasGjfzcAoB";
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
