export interface Profile {
  id: string;
  nickname: string;
  username: string;
  profileImageUrl: string | null;
  bio: string;
  followerCount: number;
  followingCount: number;
  playlistCount: number;
  likedTrackCount: number;
  followingPlaylistCount: number;
  genres: string[];
  isMe: boolean;
  isFollowing: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
}

export interface GenreTagsProps {
  userId: string;
  genres: string[];
  onSave?: (genres: string[]) => void;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string | null;
  trackCount: number;
  isPublic: boolean;
  ownerId: string;
  ownerNickname: string;
  images?: { url: string }[];
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
