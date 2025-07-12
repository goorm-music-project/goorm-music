import { db } from "@/domains/common/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  if (!userId) return new NextResponse("No userId", { status: 400 });

  try {
    // 1. Firestore에서 유저 검색
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    // 2. 존재하면 그대로 반환
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return NextResponse.json({ userId, ...userData });
    }

    // 3. Firestore에 없으면 → Spotify에서 가져오기
    const cookieStore = cookies();
    const access_token = cookieStore.get("access_token")?.value;
    if (!access_token)
      return new NextResponse("No access_token", { status: 401 });

    // 4. Spotify Public User Profile 조회
    const res = await axios.get(`https://api.spotify.com/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { id, display_name, images } = res.data;

    // 5. Firestore에 신규 저장 (email, 장르는 비워둠)
    const userData = {
      userId: id,
      display_name: display_name || "",
      imageUrl: images?.[0]?.url || null,
      genres: [], // 기본값 (public 정보 없음)
      // 추가 필드 자유롭게
    };
    await setDoc(userRef, userData);

    // 6. 그 정보 반환
    return NextResponse.json(userData);
  } catch (err: any) {
    console.error(
      "❌ Error fetching user:",
      err?.response?.data || err?.message
    );
    return new NextResponse("Error fetching user", { status: 500 });
  }
}
