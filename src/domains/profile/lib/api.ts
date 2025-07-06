import axios from "axios";
import { Profile } from "../types/Profile";

export async function fetchProfile(accessToken: string): Promise<Profile> {
  const res = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return {
    id: res.data.id,
    nickname: res.data.display_name,
    username: res.data.id,
    profileImageUrl: res.data.images?.[0]?.url ?? null,
    bio: "",
    followerCount: res.data.followers?.total ?? 0,
    followingCount: 0,
    playlistCount: 0,
    likedTrackCount: 0,
    followingPlaylistCount: 0,
    genres: [],
    isMe: true,
    isFollowing: false,
  };
}
