// src/app/api/playlist/unfollow/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { playlistId } = await req.json();

  try {
    await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("언팔로우 실패", err);
    return NextResponse.json({ error: "Unfollow failed" }, { status: 500 });
  }
}
