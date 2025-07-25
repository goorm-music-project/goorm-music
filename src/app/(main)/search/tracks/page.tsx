/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import PlayListBoxSkeleton from "@/domains/playlist/components/PlayListBoxSkeleton";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 15;

// useSearchParams를 사용하는 컴포넌트를 분리
function SearchTracksContent() {
  const params = useSearchParams();
  const query = params.get("query") || "";
  const [datas, setDatas] = useState<PlaylistItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const res = await appAxios.get(
      `/api/search/track?searchText=${encodeURIComponent(
        query
      )}&offset=${offset}&limit=${LIMIT}`
    );
    const newData = res.data;
    if (newData.length < LIMIT) {
      setHasMore(false);
    }
    setDatas((prev) => [...prev, ...newData]);
    setOffset((prev) => prev + LIMIT);
  };

  useEffect(() => {
    setDatas([]);
    setOffset(0);
    setHasMore(true);
    fetchData();
  }, [query]);

  return (
    <div>
      <h2>더 많은 곡을 감상하세요.</h2>
      <div id="scrollableDiv" className="h-[80vh] overflow-auto relative">
        <InfiniteScroll
          dataLength={datas.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<PlayListBoxSkeleton />}
          scrollableTarget="scrollableDiv"
        >
          <PlayBar tracks={datas} className={"twoGrid"} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchTracksContent />
    </Suspense>
  );
}
