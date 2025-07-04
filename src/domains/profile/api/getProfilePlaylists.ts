// src/domains/profile/api/getProfilePlaylists.ts
import { Playlist } from "../types/Playlist";

export async function getProfilePlaylists(userId: string): Promise<Playlist[]> {
  return [
    {
      id: "1",
      name: "내가 좋아하는 K-Pop",
      description: "최신 K-Pop 히트곡을 모아놨어요.",
      coverImageUrl: null,
      trackCount: 25,
      isPublic: true,
      ownerId: userId,
      ownerNickname: "김뮤직",
    },
    {
      id: "2",
      name: "밤에 듣기 좋은 음악",
      description: "조용한 밤에 어울리는 감성적인 곡들",
      coverImageUrl: null,
      trackCount: 18,
      isPublic: false,
      ownerId: userId,
      ownerNickname: "김뮤직",
    },
  ];
}
