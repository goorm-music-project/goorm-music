// src/domains/profile/types/Track.ts

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCoverUrl: string | null;
  duration: number; // 초 단위(예: 220 = 3:40)
  isLiked: boolean;
}
