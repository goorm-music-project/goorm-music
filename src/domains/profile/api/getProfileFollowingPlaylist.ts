// src/domains/profile/api/getProfileFollowingPlaylist.ts
import { Playlist } from "../types/Playlist";

export async function getProfileFollowingPlaylist(
  userId: string
): Promise<Playlist[]> {
  return [
    {
      id: "3",
      name: "Today's Top Hits",
      description: "오늘의 인기 음악",
      coverImageUrl: null,
      trackCount: 50,
      isPublic: true,
      ownerId: "spotify",
      ownerNickname: "Spotify",
    },
  ];
}
