import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return new NextResponse("No access_token", { status: 401 });
  }

  try {
    const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = res.data.items;
    return NextResponse.json(data);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "isAxiosError" in error &&
      (error as AxiosError).isAxiosError
    ) {
      const axiosError = error as AxiosError;
      console.error("플리 가져오기 오류", axiosError.message);
      return NextResponse.json(
        { error: axiosError.message },
        { status: axiosError.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      console.error("플리 가져오기 오류", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("플리 가져오기 오류: 알 수 없는 에러");
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
