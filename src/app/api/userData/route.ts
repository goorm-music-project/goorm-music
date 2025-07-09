import { db } from "@/domains/common/lib/firebase";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 유저 정보 조회 (POST)
export async function POST() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;
  if (!access_token) return new Response("No access_token", { status: 401 });

  try {
    const res = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id: userId, display_name, email, images } = res.data;
    const imageUrl = images && images.length > 0 ? images[0].url : null;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    let genres: string[] = [];
    let nickname = display_name;
    if (userSnap.exists()) {
      genres = userSnap.data().genres || [];
      nickname = userSnap.data().nickname || display_name;
    }

    return NextResponse.json({
      userId,
      display_name,
      nickname,
      email,
      genres,
      imageUrl,
    });
  } catch {
    return new Response("Failed to fetch user profile", { status: 500 });
  }
}

// 닉네임 및 장르 저장/수정 (PATCH)
export async function PATCH(req: Request) {
  try {
    const cookieAwait = await cookies();
    const access_token = cookieAwait.get("access_token")?.value;
    if (!access_token) return new Response("No access_token", { status: 401 });

    const {
      userId,
      genres,
      nickname,
    }: {
      userId?: string;
      genres?: string[];
      nickname?: string;
    } = await req.json();

    if (!userId) return new Response("userId required", { status: 400 });

    const userRef = doc(db, "users", userId);

    const updateData: { [key: string]: string | string[] } = {};
    if (Array.isArray(genres)) updateData.genres = genres;
    if (typeof nickname === "string") updateData.nickname = nickname;

    await updateDoc(userRef, updateData);
    return NextResponse.json({ success: true });
  } catch {
    return new Response("Failed to update user", { status: 500 });
  }
}
