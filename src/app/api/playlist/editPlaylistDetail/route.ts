import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }
  const { name, description, isPublic, id } = await req.json();

  try {
    await axios.put(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        name,
        public: isPublic === "true",
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json("플레이리스트 수정 완료");
  } catch (err) {
    console.log("플레이리스트 수정 오류", err);
  }
}
