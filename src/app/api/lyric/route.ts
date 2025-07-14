import { NextRequest, NextResponse } from "next/server";
import Genius from "genius-lyrics-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, artist } = body;

    if (!title || !artist) {
      return NextResponse.json({ error: "title과 artist는 필수입니다." }, { status: 400 });
    }

    const options = {
      apiKey: process.env.GENIUS_ACCESS_TOKEN!,
      title,
      artist,
      optimizeQuery: true,
    };

    const lyrics = await Genius.getLyrics(options);
    const song = await Genius.getSong(options);

    return NextResponse.json({
      lyrics,
      geniusUrl: song?.url || null,
    });
  } catch (err: unknown) {
    console.error("Genius API 요청 실패:", err);
    return NextResponse.json({ error: "가사 조회 실패" }, { status: 500 });
  }
}
