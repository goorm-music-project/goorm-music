import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TrackItem } from "../route";

export async function GET(req: Request) {
  const access_token = (await cookies()).get("public_access_token")?.value;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("searchText");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const limit = parseInt(searchParams.get("limit") ?? "15");

  if (!access_token) {
    return NextResponse.json({ error: "access_token 누락" }, { status: 401 });
  }

  if (!query) {
    return NextResponse.json({ error: "검색어 누락" }, { status: 400 });
  }

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const json = res.data;
    const data = json.tracks?.items.map((v: TrackItem) => ({
      track: v,
    }));
    // TODO: playable 검열
    return NextResponse.json(data);
  } catch (err) {
    console.log("검색 오류", err);
    return NextResponse.json(err);
  }
}
