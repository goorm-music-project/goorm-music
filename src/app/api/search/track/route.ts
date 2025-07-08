import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const access_token = (await cookies()).get("public_access_token")?.value;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("searchText");

  if (!access_token || !query) {
    return NextResponse.json(
      { error: "access_token 또는 검색어 누락" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const json = res.data;
    const data = json.tracks?.items.map((v: any) => ({
      track: v,
    }));
    return NextResponse.json(data);
  } catch (err) {
    console.log("검색 오류", err);
    return NextResponse.json(err);
  }
}
