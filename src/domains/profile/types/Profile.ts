export interface Profile {
  id: string;
  email?: string;
  nickname: string;
  username: string;
  imageUrl: string | null;
  genres: string[];
  isMe: boolean;
}

export interface GenreTagsProps {
  userId: string;
  genres: string[];
  onSave?: (genres: string[]) => void;
  showEditButton?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string | null;
  trackCount?: number;
  isPublic?: boolean;
  public?: boolean;
  ownerId: string;
  owner: {
    id: string;
  };
  ownerNickname: string;
  images?: { url: string }[];
  tracks?: {
    total?: number;
  };
  isMe: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCoverUrl: string | null;
  duration: number;
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
