export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
  public: boolean;
  owner: {
    id: string;
  }
}

export interface AddNewPlaylistProps {
  userId: string;
  accessToken: string;
  name: string;
  description?: string;
  isPublic: string;
}

export interface AddTrackProps {
  accessToken: string;
  playlistId: string;
  track: string[];
}

export interface PlaylistItem {
  track: {
    id: string;
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
    uri: string;
  };
}

// 상단 플레이리스트 정보
export interface PlaylistInfo {
  id: string;
  name: string;
  images: { url: string }[];
  description: string;
  owner: { display_name: string };
  uri: string;
}

// 트랙 한 개
export interface PlaylistTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
}

export interface PlaylistDetail {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  owner: { display_name: string };
  tracks: {
    items: {
      added_at: string;
      track: PlaylistTrack;
    }[];
  };
}
