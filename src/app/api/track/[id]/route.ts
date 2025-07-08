import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Genius from "genius-lyrics-api";
import { cookies } from "next/headers";

type SpotifyArtist = {
  id: string;
  name: string;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: {
    images: { url: string }[];
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const trackId = id;

  try {
    const token = (await cookies()).get("public_access_token")?.value;

    const trackRes = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const track = trackRes.data as SpotifyTrack;
    const title = track.name;
    const artists = track.artists?.map((artist) => artist.name);
    const artistsId = track.artists?.map((artist) => artist.id);
    const options = {
      apiKey: process.env.GENIUS_ACCESS_TOKEN!,
      title,
      artist: artists[0],
      optimizeQuery: true,
    };
    const lyrics = await Genius.getLyrics(options);
    const song = await Genius.getSong(options);
    return NextResponse.json({
      title,
      artists,
      imageUrl: track.album?.images?.[0]?.url,
      lyrics,
      artistsId,
      geniusUrl: song?.url || null,
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error(
        "트랙 상세 정보 조회 실패: ",
        err.response?.data || err.message
      );
    } else if (err instanceof Error) {
      console.error("트랙 상세 정보 조회 실패: ", err.message);
    } else {
      console.error("트랙 상세 정보 조회 실패: 알 수 없는 에러");
    }

    return NextResponse.json(
      { error: "트랙 상세 정보 조회 실패" },
      { status: 500 }
    );
  }
}
