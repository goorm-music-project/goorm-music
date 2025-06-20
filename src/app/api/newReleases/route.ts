import { getAccessToken } from "@/app/lib/getAccessToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases?limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    return NextResponse.json(data.albums.items); // 앨범 목록만 응답
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "fail to newReleases data" });
  }
}
