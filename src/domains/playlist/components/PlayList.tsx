"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Playlist } from "../types/Playlist";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { usePlaylistStore } from "@/domains/playlist/stores/usePlaylist";
import PlayListBox from "./PlayListBox";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { useAlertModalStore } from "@/domains/common/stores/useAlertModalStore";

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string;
};
export default function PlayList({ playlists, setPlaylists, track }: Props) {
  const { userId } = userSpotifyStore();
  const { setPlaylistsStore } = usePlaylistStore();
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage, setShowAlertModal } = useAlertModalStore();

  useEffect(() => {
    if (!userId) return;

    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const res = await authAxios.get("/api/playlist/getPlaylist");
        const data = res.data as Playlist[];
        const myPlaylist = data.filter((v) => v.owner.id === userId);
        setPlaylists(myPlaylist);
        setPlaylistsStore(myPlaylist);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [setPlaylists, userId, setPlaylistsStore]);

  const handleAddPlayList = async (playlistId: string) => {
    const res = await authAxios.get(
      `/api/playlist/getPlaylistDetail?id=${playlistId}`
    );
    const detailData = res.data;
    const alreadyExists = detailData.tracks.items.some(
      (item: { track: { uri: string } }) => item.track.uri === track
    );
    if (alreadyExists) {
      setMessage("이미 해당 플레이리스트에 존재하는 곡입니다.");
      setShowAlertModal(true);
      return;
    }

    try {
      setIsLoading(true);
      await authAxios.post("/api/playlist/addTrack", { playlistId, track });

      const res = await authAxios.get("/api/playlist/getPlaylist");
      const json = res.data as Playlist[];
      const data = json.filter((v) => v.owner.id === userId);
      setPlaylists(data);
      setPlaylistsStore(data);
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      setIsLoading(false);
      setMessage("플레이리스트에 추가되었습니다.");
      setShowAlertModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="w-[480px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <PlayListBox
          key={playlist.id}
          playlist={playlist}
          handleAddPlayList={handleAddPlayList}
        />
      ))}
    </div>
  );
}
