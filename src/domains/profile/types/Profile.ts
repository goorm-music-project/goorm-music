// src/domains/profile/types/Profile.ts

export interface Profile {
  id: string;
  nickname: string;
  username: string; // @musiclover2024
  profileImageUrl: string | null;
  bio: string; // 자기소개
  followerCount: number;
  followingCount: number;
  playlistCount: number;
  likedTrackCount: number;
  followingPlaylistCount: number;
  genres: string[];
  isMe: boolean; // 본인 여부
  isFollowing: boolean; // 내가 이 유저 팔로우 중인지(타인 프로필만)
}
