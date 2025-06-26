/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/domains/common/lib/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
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

    const { id: userId, display_name, email } = res.data;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    console.log("검사하기");
    const userExists = userSnap.exists();
    console.log("userIddddddddd", userId);

    return NextResponse.json({ userId, display_name, email, userExists });
  } catch (err: any) {
    console.error("❌❌❌❌", err.response?.data || err.message);
    return new Response("Failed to fetch user profile", { status: 500 });
  }
}
