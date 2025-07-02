import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("playlistId");

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
    console.log(err);
  }
}
