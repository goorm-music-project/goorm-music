"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { Navigation } from "swiper/modules";
import TrackCard from "@/domains/common/components/TrackCard";
import TrackCardSkeleton from "@/domains/common/components/TrackCardSkeleton";
import SwiperArrow from "@/domains/common/components/SwiperArrow";

type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
};

export default function NewReleaseAlbum() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    appAxios.get("/api/newReleases").then((res) => setAlbums(res.data));
  }, []);

  return (
    <main className="mb-4">
      <h1>최신 앨범을 만나보세요.</h1>
      <div className="relative">
        <div className="w-[90%] ml-[5%]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            className="albumSwiper"
            navigation={{
              prevEl: ".newRelease-prev",
              nextEl: ".newRelease-next",
            }}
            modules={[Navigation]}
          >
            {albums.length === 0
              ? Array.from({ length: 10 }).map((_, i) => (
                  <SwiperSlide key={i} style={{ width: "150px" }}>
                    <TrackCardSkeleton />
                  </SwiperSlide>
                ))
              : albums.map((album) => (
                  <SwiperSlide key={album.id} style={{ width: "150px" }}>
                    <div>
                      <Link href={`/album/${album.id}`}>
                        <TrackCard
                          key={album.id}
                          imageUrl={
                            album.images[0]?.url || "/goorm_logo_blue.png"
                          }
                          name={album.name}
                          artists={album.artists.map((a) => a.name)}
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <SwiperArrow classPrev="newRelease-prev" classNext="newRelease-next" />
      </div>
    </main>
  );
}
