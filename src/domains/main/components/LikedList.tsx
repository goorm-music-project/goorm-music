"use client";

import { useEffect, useState } from "react";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import PlayBar from "./PlayBar";

export default function LikedList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    fetch("/api/likeList")
      .then((res) => res.json())
      .then((data) => setDatas(data));
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
