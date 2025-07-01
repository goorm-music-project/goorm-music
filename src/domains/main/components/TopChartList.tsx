"use client";
import { useEffect, useState } from "react";

import { PlaylistItem } from "@/domains/playlist/types/Playlist";

import PlayBar from "./PlayBar";

export default function TopChartList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    fetch("/api/topChart")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  return (
    <main>
      <h1>추천 음악을 들어보세요.</h1>
      <PlayBar tracks={datas} />
    </main>
  );
}
