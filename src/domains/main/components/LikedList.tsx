"use client";

import { useEffect, useState } from "react";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import PlayBar from "./PlayBar";
import authAxios from "@/domains/common/lib/axios/authAxios";

export default function LikedList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    authAxios.get("/api/likeList").then((res) => setDatas(res.data));
  }, []);

  return (
    <main className="mb-4">
      <h1>좋아하는 음악을 만나보세요.</h1>
      <div className="flex flex-col gap-3">
        <PlayBar tracks={datas} selectable={false} />
      </div>
    </main>
  );
}
