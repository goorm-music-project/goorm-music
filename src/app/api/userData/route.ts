/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/domains/common/lib/firebase";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieAwait = await cookies();
  const access_token = cookieAwait.get("access_token")?.value;

  if (!access_token) {
    return new Response("No access_token", { status: 401 });
  }

  try {
    const res = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id: userId, display_name, email, images } = res.data;
    const imageUrl = images && images.length > 0 ? images[0].url : null;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    console.log("검사하기");
    const userExists = userSnap.exists();

    let genres: string[] = [];
    if (userExists) {
      genres = userSnap.data()?.genres || [];
    }

    return NextResponse.json({
      userId,
      display_name,
      email,
      userExists,
      imageUrl,
      genres,
    });
  } catch (err: any) {
    console.error("❌❌❌❌", err.response?.data || err.message);
    return new Response("Failed to fetch user profile", { status: 500 });
  }
}

// 선호 장르 저장/수정 (PATCH)
export async function PATCH(req: Request) {
  try {
    const cookieAwait = await cookies();
    const access_token = cookieAwait.get("access_token")?.value;
    if (!access_token) return new Response("No access_token", { status: 401 });

    const { userId, genres }: { userId?: string; genres?: string[] } =
      await req.json();

    if (!userId || !Array.isArray(genres))
      return new Response("userId, genres required", { status: 400 });

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { genres });

    return NextResponse.json({ success: true, genres });
  } catch (err: any) {
    console.error("❌❌❌❌", err?.response?.data || err?.message);
    return new Response("Failed to update genres", { status: 500 });
  }
}
