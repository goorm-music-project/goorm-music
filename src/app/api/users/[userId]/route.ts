import { db } from "@/domains/common/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

interface SpotifyPlaylist {
  public: boolean;
  id: string;
  name: string;
  description?: string;
  images?: { url: string }[];
  owner?: {
    id: string;
    display_name?: string;
  };
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  if (!userId) return new NextResponse("No userId", { status: 400 });

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    let userData;

    if (userSnap.exists()) {
      userData = userSnap.data();
    } else {
      const cookieStore = await cookies();
      const access_token = cookieStore.get("access_token")?.value;

      if (!access_token)
        return new NextResponse("No access_token", { status: 401 });

      const resUser = await axios.get(
        `https://api.spotify.com/v1/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { id, display_name, images } = resUser.data;

      userData = {
        userId: id,
        display_name: display_name || "",
        imageUrl: images?.[0]?.url || null,
        genres: [],
      };

      await setDoc(userRef, userData);
    }

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    let playlists: SpotifyPlaylist[] = [];

    if (access_token) {
      try {
        const resPlaylists = await axios.get(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        playlists = resPlaylists.data.items.filter(
          (pl: SpotifyPlaylist) => pl.public === true
        );
      } catch (e) {
        console.error("Error fetching playlists:", e);
      }
    }

    return NextResponse.json({
      ...userData,
      playlists,
    });
  } catch (err: unknown) {
    console.error("❌ Error fetching user:", err);
    return new NextResponse("Error fetching user", { status: 500 });
  }
}
