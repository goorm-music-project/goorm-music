import { genreList } from "@/domains/common/constants/genre";
import { SpotifyTrack } from "@/domains/track/types/SpotifyTrack";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const access_token = (await cookies()).get("public_access_token")?.value;
  const { searchParams } = new URL(req.url);
  const genreParmas = searchParams.get("genre") || "팝";
  const genre = genreList.find((v) => v.ko === genreParmas)?.en;

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&market=KR`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const datas = (await res.data.tracks.items) as SpotifyTrack[];
    const censoredTracks = datas.filter((data) => data.is_playable === true);
    return NextResponse.json(censoredTracks);
  } catch (err) {
    console.log("장르 리스트 오류", err);
    return NextResponse.json(err);
  }
}
