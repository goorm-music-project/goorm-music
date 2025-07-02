/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { genreList } from "@/domains/common/constants/genre";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";

export default function Page() {
  const [isSelect, setIsSelect] = useState("발라드");
  const [datas, setDatas] = useState<PlaylistItem[]>([]);

  const fetchData = async (genre: string) => {
    const res = await fetch(`/api/jenreRecoList?genre=${genre}`);
    const json = await res.json();

    const data = json
      .map((v: any) => ({
        track: {
          id: v.id,
          name: v.name,
          album: {
            name: v.album.name,
            images: v.album.images,
          },
          artists: v.artists.map((a: any) => ({ name: a.name })),
          uri: v.uri,
        },
      }))
      .slice(0, 50);
    setDatas(data);
  };
  const handleClickGenre = async (genre: string) => {
    setIsSelect(genre);
    fetchData(genre);
  };

  useEffect(() => {
    fetchData(isSelect);
  }, [isSelect]);

  return (
    <div>
      <h1>장르별 음악들을 확인해보세요.</h1>
      <div className="my-2 w-[100vw]">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
        >
          {genreList.map((genre) => {
            const isActive = genre.ko === isSelect;
            return (
              <SwiperSlide key={genre.ko} style={{ width: "auto" }}>
                <button
                  type="button"
                  tabIndex={-1}
                  className={`px-4 py-1.5 rounded-full border font-semibold text-sm transition ${
                    isActive
                      ? "bg-(--primary-blue) text-white border-(--primary-blue)"
                      : "bg-white text-(--primary-blue) border-(--primary-blue)"
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    handleClickGenre(genre.ko);
                  }}
                >
                  {genre.ko}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div>
        <PlayBar tracks={datas} />
      </div>
    </div>
  );
}
