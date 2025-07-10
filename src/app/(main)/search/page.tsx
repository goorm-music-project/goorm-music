/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import TrackCard from "@/domains/common/components/TrackCard";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("params") || "";

  const [data, setData] = useState<any>([]);
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
              .map((item: any) => (
                <TrackCard
                  key={item.id}
                  imageUrl={item.images?.[0]?.url}
                  name={item.name}
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
            data.albums?.items?.map((item: any) => (
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
              ?.filter((item: any) => item !== null)
              .map((item: any) => (
                <Link href={`/playlist/${item.id}?page=follow`} key={item.id}>
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
