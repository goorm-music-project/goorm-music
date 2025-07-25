"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

// useSearchParams를 사용하는 컴포넌트를 분리
function SearchTracksContent() {
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
    <>
      <h2>더 많은 곡을 감상하세요.</h2>
      <div>{datas && <PlayBar tracks={datas} className={"twoGrid"} />}</div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchTracksContent />
    </Suspense>
  );
}
