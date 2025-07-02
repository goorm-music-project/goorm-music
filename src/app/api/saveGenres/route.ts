import { db } from "@/domains/common/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, genres } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "userId가 없습니다." });
  }

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        preferredGenres: genres,
        updateAt: Date.now(),
      },
      {
        merge: true,
      }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("장르 저장 오류", error);
    return NextResponse.json({ error: "save genre error" });
  }
}
