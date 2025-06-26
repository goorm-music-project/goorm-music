"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Playlist } from "../types/Playlist";
<<<<<<< HEAD:src/app/components/PlayList.tsx
import LoadingSpinner from "./loading/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
=======
import LoadingSpinner from "@/domains/common/components/loading/LoadingSpinner";
>>>>>>> b5352ce (refactor : 폴더 구조 변경):src/domains/playlist/components/PlayList.tsx

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string[];
};
export default function PlayList({ playlists, setPlaylists, track }: Props) {
<<<<<<< HEAD
  const { accessToken, userId } = userSpotifyStore.getState();
=======
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 783b6f6 (refactor : 로딩 전역관리 로직 삭제)

  useEffect(() => {
    const fetchPlaylists = async () => {
<<<<<<< HEAD
=======
      setIsLoading(true);
>>>>>>> 783b6f6 (refactor : 로딩 전역관리 로직 삭제)
      try {
        const res = await fetch("/api/playlist/getPlaylist");
        const data = await res.json();
        setPlaylists(data);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
<<<<<<< HEAD
=======
        setIsLoading(false);
>>>>>>> 783b6f6 (refactor : 로딩 전역관리 로직 삭제)
      }
    };

    fetchPlaylists();
<<<<<<< HEAD
  }, [accessToken, setPlaylists]);
=======
  }, [setPlaylists, setIsLoading]);
>>>>>>> 783b6f6 (refactor : 로딩 전역관리 로직 삭제)

  const handleAddPlayList = async (playlistId: string) => {
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
      const data = await res.json();
      setPlaylists(data);
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      setIsLoading(false);
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
