export type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  is_playable: boolean;
};
