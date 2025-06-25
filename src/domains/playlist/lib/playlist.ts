import { AddNewPlaylistProps, AddTrackProps } from "@/app/types/Playlist";
import axios from "axios";

// 플레이리스트
export const getPlaylist = async (accessToken: string) => {
  const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}}`,
    },
  });
  return res.data.items;
};

interface PlaylistDetail {
  accessToken: string;
  playlistId: string;
}

// 플레이리스트 상세 정보
export const getPlaylistDetail = async ({
  accessToken,
  playlistId,
}: PlaylistDetail) => {
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// 새로운 플레이리스트 추가
export const addNewPlaylist = async ({
  userId,
  accessToken,
  name,
  description,
  isPublic,
}: AddNewPlaylistProps) => {
  try {
    const res = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name,
        public: isPublic === "true",
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.id;
  } catch (error) {
    console.log("저장 에러", error);
    return error;
  }
};

//플레이리스트에 곡 추가
export const addTrackToPlaylist = async ({
  accessToken,
  playlistId,
  track,
}: AddTrackProps) => {
  await axios.post(
    `
https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris: [track],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
