import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  const { name, description, isPublic, userId } = await req.json();

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }

  try {
    const res = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
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
    const data = res.data.id;
    return NextResponse.json(data);
  } catch (err) {
    console.log("새로운 플리 저장 오류", err);
    return NextResponse.json(err);
  }
}
