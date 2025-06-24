"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPlaylist } from "../lib/playlist";
import { Playlist } from "../types/Playlist";

type Props = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
};
export default function PlayList({ playlists, setPlaylists }: Props) {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const playlistData = await getPlaylist(accessToken);
        setPlaylists(playlistData);
      } catch (error) {
        console.error("플레이리스트 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [accessToken, setPlaylists]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex gap-4 p-2 rounded border border-(--gray) cursor-pointer hover:bg-(--primary-blue-hover)"
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
