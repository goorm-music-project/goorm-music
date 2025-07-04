// src/domains/profile/api/getProfile.ts
import { Profile } from "../types/Profile";

// userId를 받아 해당 유저 프로필 반환
export async function getProfile(userId: string): Promise<Profile> {
  // TODO: 실제 API 연동 시 fetch/axios로 교체
  // 임시로 더미 데이터 반환
  return {
    id: userId,
    nickname: "김뮤직",
    username: "musiclover2024",
    profileImageUrl: null,
    bio: "음악을 사랑하는 사람입니다. 다양한 장르의 음악을 즐겨 듣고 플레이리스트를 만드는 것을 좋아해요! 🎵",
    followerCount: 1234,
    followingCount: 567,
    playlistCount: 12,
    likedTrackCount: 89,
    followingPlaylistCount: 1,
    genres: ["K-Pop", "Hip Hop", "R&B", "Pop", "Jazz", "Electronic"],
    isMe: userId === "me",
    isFollowing: false,
  };
}
