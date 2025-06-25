"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { addTrackToPlaylist, getPlaylist } from "../lib/playlist";
import { Playlist } from "../types/Playlist";
import { useLoadingStore } from "../stores/loadingStore";
import LoadingSpinner from "./loading/LoadingSpinner";
import { useSpotifyStore } from "../stores/useSpotifyStore";

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string[];
};
export default function PlayList({ playlists, setPlaylists, track }: Props) {
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const { accessToken, userId } = useSpotifyStore.getState();

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      startLoading();
      try {
        const playlistData = await getPlaylist(accessToken);
        setPlaylists(playlistData);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
        stopLoading();
      }
    };

    fetchPlaylists();
  }, [accessToken, setPlaylists, startLoading, stopLoading]);

  const handleAddPlayList = async (playlistId: string) => {
    if (!accessToken) return;
    const res = await addTrackToPlaylist({ accessToken, playlistId, track });
  };

  if (isLoading) return <LoadingSpinner />;

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
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
