import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { id } = await req.json();

  try {
    await axios.put(
      `https://api.spotify.com/v1/playlists/${id}/followers`,
      null,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("팔로우 추가 오류", err);
  }
}
