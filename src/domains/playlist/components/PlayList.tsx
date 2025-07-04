"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Playlist } from "../types/Playlist";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import PlayListBox from "./PlayListBox";

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string;
};
export default function PlayList({ playlists, setPlaylists, track }: Props) {
  const { userId } = userSpotifyStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/playlist/getPlaylist");
        const data = await res.json();
        const myPlaylist = data.filter((v) => v.owner.id === userId);
        setPlaylists(myPlaylist);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [setPlaylists, userId]);

  const handleAddPlayList = async (playlistId: string) => {
    const res = await fetch(`/api/playlist/getPlaylistDetail?id=${playlistId}`);
    const detailData = await res.json();

    const alreadyExists = detailData.tracks.items.some(
      (item: { track: { uri: string } }) => item.track.uri === track
    );
    if (alreadyExists) {
      alert("이미 해당 플레이리스트에 존재하는 곡입니다.");
      return;
    }

    try {
      setIsLoading(true);
      await fetch("/api/playlist/addTrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId, track }),
      });

      //TODO : 신규 트랙 추가 후 플리 track 수 업데이트 미반영 오류
      const res = await fetch("/api/playlist/getPlaylist");
      const json = await res.json();
      const data = json.filter((v) => v.owner.id === userId);
      setPlaylists(data);
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

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
