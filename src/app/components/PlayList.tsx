"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { addTrackToPlaylist, getPlaylist } from "../lib/playlist";
import { Playlist } from "../types/Playlist";
import LoadingSpinner from "./loading/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string[];
};
export default function PlayList({ playlists, setPlaylists, track }: Props) {
  const { accessToken, userId } = userSpotifyStore.getState();

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      try {
        const playlistData = await getPlaylist(accessToken);
        setPlaylists(playlistData);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
      }
    };

    fetchPlaylists();
  }, [accessToken, setPlaylists]);

  const handleAddPlayList = async (playlistId: string) => {
    if (!accessToken) return;
    try {
      startLoading();
      await addTrackToPlaylist({ accessToken, playlistId, track });

      //TODO : 신규 트랙 추가 후 플리 track 수 업데이트 미반영 오류
      const playlistData = await getPlaylist(accessToken);
      setPlaylists(playlistData);
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex gap-4 p-2 rounded border border-(--gray) cursor-pointer hover:bg-(--primary-blue-hover)"
          onClick={() => handleAddPlayList(playlist.id)}
        >
          <Image
            src={playlist.images?.[0]?.url || "/goorm_logo_blue.png"}
            alt={playlist.name}
            width={100}
            height={100}
            className="rounded"
          />
          <div className="place-content-center">
            <h3>{playlist.name}</h3>
            <p>{playlist.tracks.total} 곡</p>
          </div>
        </div>
      ))}
    </div>
  );
}
