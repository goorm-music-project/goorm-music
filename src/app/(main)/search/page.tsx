"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import AlbumSection from "@/domains/search/components/AlbumSection";
import ArtistSection from "@/domains/search/components/ArtistSection";
import PlaylistSection from "@/domains/search/components/PlaylistSection";
import TrackSection from "@/domains/search/components/TrackSection";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

type dataType = {
  artists: {
    items: Array<{
      id: string;
      name: string;
      images: { url: string }[];
    }>;
  };
  tracks: PlaylistItem[];
  albums: {
    items: Array<{
      id: string;
      name: string;
      images: { url: string }[];
    }>;
  };
  playlists: {
    items: Array<{
      id: string;
      name: string;
      images: { url: string }[];
    }>;
  };
};

// useSearchParams를 사용하는 컴포넌트를 분리
function SearchContent() {
  const params = useSearchParams();
  const query = params.get("params") || "";
  const [data, setData] = useState<dataType>();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setisLoading(true);
        const res = await appAxios.get(
          `/api/search?searchText=${encodeURIComponent(query)}`
        );
        const json = res.data;
        setData(json);
      } catch (err) {
        console.log("검색 오류", err);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div>
        <h2 className="mb-2">대표 아티스트</h2>
        {data && <ArtistSection data={data.artists} />}
      </div>

      <div className="mt-2">
        <h2 className="my-2">앨범</h2>
        {data && <AlbumSection data={data.albums} />}
      </div>

      <div className="mt-2">
        <h2 className="my-2">플레이리스트</h2>
        {data && <PlaylistSection data={data.playlists} />}
      </div>

      <div className="mt-2">
        <Link href={`/search/tracks?query=${encodeURIComponent(query)}`}>
          <h2 className="my-2 cursor-pointer hover:underline">곡</h2>
        </Link>
        {data && <TrackSection data={data.tracks} />}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  );
}
