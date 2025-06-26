"use client";

import { useEffect, useState } from "react";
import PlaylistBar from "./PlaylistBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";

export default function RandomRecoList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    fetch("/api/randomRecoList")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, [datas]);

  return (
    <main className="mb-4">
      <h1>새로운 취향을 만나보세요.</h1>
      <div className="flex flex-col gap-3">
        {datas.map((item) => (
          <PlaylistBar key={item.track.id} item={item} />
        ))}
      </div>
    </main>
  );
}
