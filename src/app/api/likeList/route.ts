import { db } from "@/domains/common/lib/firebase";
import { cookies } from "next/headers";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface SpotifyMeResponse {
  id: string;
}

export async function GET() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json({ error: "no token" }, { status: 401 });
  }
  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/tracks?limit=50",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = res.data.items;
    return NextResponse.json(data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("❌ 좋아요 리스트 실패", err.response?.data || err.message);
    } else if (err instanceof Error) {
      console.log("❌ 좋아요 리스트 실패(일반 에러)", err.message);
    } else {
      console.log("❌ 좋아요 리스트 실패(unknown)", err);
    }
    return NextResponse.json({ error: "Spotify API Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieAwait = await cookies();
    const access_token = cookieAwait.get("access_token")?.value;
    if (!access_token)
      return NextResponse.json({ error: "no token" }, { status: 401 });

    // 요청 바디 타입 명시
    const { trackId }: { trackId: string } = await req.json();
    if (!trackId)
      return NextResponse.json({ error: "no trackId" }, { status: 400 });

    // 1. Spotify API에서 좋아요 삭제 (타입 없음, 204 반환)
    await axios.delete("https://api.spotify.com/v1/me/tracks", {
      headers: { Authorization: `Bearer ${access_token}` },
      data: { ids: [trackId] },
    });

    // 2. Spotify에서 유저 ID 받아오기 (타입 지정)
    const resUser = await axios.get<SpotifyMeResponse>(
      "https://api.spotify.com/v1/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const userId = resUser.data.id;

    // 3. Firestore likedTracks 동기화 (타입 지정)
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists())
      return NextResponse.json({ error: "user not found" }, { status: 404 });

    // likedTracks는 string[]으로 가정
    const userData = userSnap.data() as { likedTracks?: string[] };
    const likedTracks = userData.likedTracks ?? [];
    const newLikedTracks = likedTracks.filter((id) => id !== trackId);

    await updateDoc(userRef, { likedTracks: newLikedTracks });

    return NextResponse.json({ success: true });
  } catch (err) {
    // 명확한 에러 타입 분기
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;
      return NextResponse.json({ error: axiosErr.message }, { status: 500 });
    }
    // 일반 에러
    return NextResponse.json({ error: "DELETE failed" }, { status: 500 });
  }
}
