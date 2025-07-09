"use client";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("query") || "";
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await appAxios.get(
        `/api/search/track?searchText=${encodeURIComponent(query)}`
      );
      const json = res.data;
      setDatas(json);
    };
    fetchData();
  }, [query]);
  return (
    <div>
      <h2>더 많은 곡을 감상하세요.</h2>
      <div>{datas && <PlayBar tracks={datas} />}</div>
    </div>
  );
}
