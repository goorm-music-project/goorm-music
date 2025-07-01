import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { id, tracks } = await req.json();

  try {
    await axios.delete(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      data: {
        tracks: tracks.map((uri: string) => ({ uri })),
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("트랙 삭제 실패", err);
  }
}
