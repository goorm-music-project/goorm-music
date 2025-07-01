/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken } from "@/domains/common/lib/getAccessToken";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data.tracks.items;
    const playlistItems: PlaylistItem[] = data.map((t: any) => ({
      track: {
        id: t.id,
        name: t.name,
        album: {
          name: t.album.name,
          images: t.album.images,
        },
        artists: t.artists.map((a: any) => ({ name: a.name })),
        uri: [t.uri],
      },
    }));
    return NextResponse.json(playlistItems);
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "fail to popRecoList data" });
  }
}
