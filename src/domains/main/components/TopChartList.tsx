"use client";
import { useEffect, useState } from "react";

import { PlaylistItem } from "@/domains/playlist/types/Playlist";

import PlayBar from "./PlayBar";
import appAxios from "@/domains/common/lib/axios/appAxios";

export default function TopChartList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    appAxios.get("/api/topChart").then((res) => setDatas(res.data));
  }, []);

  return (
    <main>
      <h1>추천 음악을 들어보세요.</h1>
      <PlayBar tracks={datas} className={"topChart"} />
    </main>
  );
}
