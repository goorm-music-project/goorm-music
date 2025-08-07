// app/api/get-lyrics/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, artist } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { error: "title과 artist는 필수입니다." },
        { status: 400 }
      );
    }

    const searchQuery = `${title} ${artist}`;
    const searchResponse = await axios.get(
      "https://genius.com/api/search/multi",
      {
        params: { q: searchQuery },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      }
    );

    const hits =
      searchResponse.data.response.sections
        ?.flatMap((section: any) => section.hits || [])
        .filter((hit: any) => hit.type === "song") ?? [];

    const songHit = hits.find((hit: any) =>
      hit.result.primary_artist.name
        .toLowerCase()
        .includes(artist.toLowerCase())
    );

    const geniusUrl = songHit?.result?.url;
    if (!geniusUrl) {
      return NextResponse.json(
        { error: "곡을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const songPage = await axios.get(geniusUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    const $ = cheerio.load(songPage.data);
    const lyrics = $("div[data-lyrics-container='true']").text().trim();

    if (!lyrics) {
      return NextResponse.json(
        { error: "가사를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ lyrics, geniusUrl });
  } catch (error: any) {
    console.error("가사 조회 실패:", error.message);
    return NextResponse.json({ error: "가사 조회 중 오류 발생" }, { status: 500 });
  }
}
