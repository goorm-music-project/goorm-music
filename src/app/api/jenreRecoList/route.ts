import { genreList } from "@/domains/common/constants/genre";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { searchParams } = new URL(req.url);
  const genreParmas = searchParams.get("genre") || "팝";
  const genre = genreList.find((v) => v.ko === genreParmas)?.en;

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await res.data.tracks.items;
    return NextResponse.json(data);
  } catch (err) {
    console.log("장르 리스트 오류", err);
    return NextResponse.json(err);
  }
}
