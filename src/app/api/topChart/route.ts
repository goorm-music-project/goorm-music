import { SpotifyTrack } from "@/domains/track/types/SpotifyTrack";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const access_token = (await cookies()).get("public_access_token")?.value;

    // 최신 멜론차트 TOP 100 플레이리스트
    const playlistId = "7rLPjbAZIeK3aUCSbFlWo5";
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10&market=KR`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const tracks = res.data.items as { track: SpotifyTrack }[];
    const censoredTracks = tracks.filter(
      (track) => track.track.is_playable === true
    );
    return NextResponse.json(censoredTracks);
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: error });
  }
}
