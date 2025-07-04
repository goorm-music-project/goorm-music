// src/domains/profile/api/getProfileLikedTracks.ts
import { Track } from "../types/Track";

export async function getProfileLikedTracks(userId: string): Promise<Track[]> {
  return [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      albumCoverUrl: null,
      duration: 200,
      isLiked: true,
    },
    {
      id: "2",
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      albumCoverUrl: null,
      duration: 141,
      isLiked: true,
    },
    {
      id: "3",
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      albumCoverUrl: null,
      duration: 178,
      isLiked: true,
    },
  ];
}
