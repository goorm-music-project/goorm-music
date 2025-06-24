export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
  public: boolean;
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
    uri: string[];
  };
}
