import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const access_token = (await cookies()).get("public_access_token")?.value;
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("id");

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = res.data;
    return NextResponse.json(data);
  } catch (err) {
    console.log("플리 디테일 오류", err);
    return NextResponse.json(err);
  }
}
