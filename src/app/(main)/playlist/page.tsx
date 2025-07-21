"use client";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { Playlist } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const { userId } = userSpotifyStore();
  const [listData, setListData] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await authAxios.get("/api/playlist/getPlaylist");
      const data = res.data;
      const myPlaylist = data.filter(
        (v: { owner: { id: string | null } }) => v.owner.id === userId
      );
      setListData(myPlaylist);
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>나의 플레이리스트</h1>
      <div className="flex flex-col gap-4">
        {listData.length === 0 ? (
          <p>플레이리스트가 없습니다.</p>
        ) : (
          listData.map((playlist) => (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
              <div className="flex gap-4 p-2 rounded border border-(--gray) cursor-pointer hover:bg-(--primary-blue-hover)">
                <Image
                  src={playlist.images?.[0]?.url || "/goorm_logo_blue.png"}
                  alt={playlist.name}
                  width={100}
                  height={100}
                  className="rounded"
                />
                <div className="place-content-center">
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
