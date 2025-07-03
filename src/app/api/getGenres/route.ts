import { db } from "@/domains/common/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId가 없습니다." });
  }

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "장르가 존재하지 않습니다." });
    }

    const data = userSnap.data();
    const genres = data.preferredGenres || [];

    return NextResponse.json({ genres });
  } catch (error) {
    console.log("장르 가져오기 오류", error);
    return NextResponse.json({ error: "장르 가져오기 오류" });
  }
}
