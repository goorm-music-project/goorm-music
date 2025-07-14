"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import TrackCard from "@/domains/common/components/TrackCard";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
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
        <div className="h-[20vh] overflow-y-auto">
          {data &&
            data.artists?.items
              ?.slice(0, 1)
              .map((item) => (
                <TrackCard
                  key={item.id}
                  imageUrl={item.images?.[0]?.url}
                  name={item.name}
                  onClick={() => router.push(`/artist/${item.id}`)}
                />
              ))}
        </div>
      </div>

      <div className="mt-2">
        <Link href={`/search/tracks?query=${encodeURIComponent(query)}`}>
          <h2 className="my-2 cursor-pointer hover:underline">곡</h2>
        </Link>
        <div className="h-[30vh] overflow-y-auto">
          {data?.tracks && <PlayBar tracks={data.tracks} />}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">앨범</h2>
        <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
          {data &&
            data.albums?.items?.map((item) => (
              <Link href={`/album/${item.id}`} key={item.id}>
                <TrackCard
                  key={item.id}
                  imageUrl={item.images?.[0]?.url}
                  name={item.name}
                />
              </Link>
            ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">플레이리스트</h2>
        <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
          {data &&
            data?.playlists?.items
              ?.filter((item) => item !== null)
              .map((item) => (
                <Link href={`/playlist/${item.id}`} key={item.id}>
                  <div key={item.id} className="w-[150px] h-[150px] pointer">
                    <div className="h-[130px] relative">
                      <Image
                        src={
                          item?.images?.length > 0
                            ? item.images[0].url
                            : "/goorm_logo_blue.png"
                        }
                        alt={item?.name}
                        fill
                        sizes="150px"
                      />
                    </div>
                    <p className="truncate">{item?.name}</p>
                  </div>
                </Link>
              ))}
        </div>
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
