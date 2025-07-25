"use client";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import TrackCard from "@/domains/common/components/TrackCard";
import TrackCardSkeleton from "@/domains/common/components/TrackCardSkeleton";
import SwiperArrow from "@/domains/common/components/SwiperArrow";

type TrackItem = {
  id: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
    uri: string;
  };
};

export default function JenreRecoList() {
  const [datas, setDatas] = useState<TrackItem[]>([]);
  const userId = userSpotifyStore((state) => state.userId);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const genreRes = await authAxios.post("/api/getGenres", { userId });
      const genreData = genreRes.data;
      const genreArr = genreData.genres;
      const genre = genreArr[Math.floor(Math.random() * genreArr.length)];
      const res = await authAxios.get(`/api/jenreRecoList?genre=${genre}`);
      const json = res.data;
      const data = json.slice(0, 10);
      setDatas(data);
    };

    if (userId) fetchData();
  }, [userId]);

  return (
    <main className="mb-4">
      <h1>추천 장르를 들어보세요.</h1>
      <div className="relative">
        <div className="w-[90%] ml-[5%]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            className="recoSwiper"
            navigation={{
              prevEl: ".genreList-prev",
              nextEl: ".genreList-next",
            }}
            modules={[Navigation]}
          >
            {datas.length === 0
              ? Array.from({ length: 10 }).map((_, i) => (
                  <SwiperSlide key={i} style={{ width: "150px" }}>
                    <TrackCardSkeleton />
                  </SwiperSlide>
                ))
              : datas.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    style={{ width: "150px" }}
                    onClick={() => router.push(`/track/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <TrackCard
                      imageUrl={
                        item.album.images[0]?.url || "/goorm_logo_blue.png"
                      }
                      name={item.album.name}
                      artists={item.artists.map((a) => a.name)}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <SwiperArrow classPrev="genreList-prev" classNext="genreList-next" />
      </div>
    </main>
  );
}
