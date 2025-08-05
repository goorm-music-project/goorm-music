import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    if (!accessToken) {
      return NextResponse.json(
        { error: "액세스 토큰이 없습니다. 다시 로그인해주세요." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      access_token: accessToken.value,
      success: true,
    });
  } catch (error) {
    console.error("알 수 없는 오류 발생.", error);
    return NextResponse.json(
      { error: "알 수 없는 오류 발생" },
      { status: 500 }
    );
  }
}
