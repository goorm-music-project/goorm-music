import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json({ message: "No access_token" }, { status: 401 });
  }

  try {
    const spotifyUrl =
      !userId || userId === "me"
        ? "https://api.spotify.com/v1/me/playlists"
        : `https://api.spotify.com/v1/users/${userId}/playlists`;

    const res = await axios.get(spotifyUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = res.data.items;
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const axiosError = err as AxiosError;
      console.log(
        "플리 가져오기 오류",
        axiosError.response?.data || axiosError.message
      );
    } else {
      console.log("플리 가져오기 오류", err);
    }
    return NextResponse.json({ error: "플리 가져오기 오류" }, { status: 500 });
  }
}
