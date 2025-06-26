import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }

  try {
    const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${access_token}}`,
      },
    });
    const data = res.data.items;
    return NextResponse.json(data);
  } catch (err) {
    console.log("플리 가져오기 오류", err);
    return NextResponse.json(err);
  }
}
