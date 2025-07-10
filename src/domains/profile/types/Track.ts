export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCoverUrl: string | null;
  duration: number; // 초 단위
  isLiked: boolean;
  coverImageUrl?: string;
}

export type SpotifyLikedTrack = {
  added_at: string;
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    album?: { images?: { url: string }[] };
    duration_ms: number;
  };
};
