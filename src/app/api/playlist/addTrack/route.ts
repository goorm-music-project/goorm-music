import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { playlistId, track } = await req.json();

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }

  try {
    await axios.post(
      `
https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [track],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("플리에 트랙 추가 오류", err);
    return NextResponse.json(err);
  }
}
