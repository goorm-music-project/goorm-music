"use client";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import TrackCard from "@/domains/common/components/TrackCard";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { Playlist } from "@/domains/playlist/types/Playlist";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import TrackCardSkeleton from "@/domains/common/components/TrackCardSkeleton";
import SwiperArrow from "@/domains/common/components/SwiperArrow";
import { useLoginModalStore } from "@/domains/common/stores/useLoginModalStore";

export default function MyPlayList({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { userId } = userSpotifyStore();
  const [listData, setListData] = useState<Playlist[]>([]);
  const router = useRouter();
  const { setShowLoginModal } = useLoginModalStore();

  const handleAddPlayListBtn = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      router.push("/playlist");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchData = async () => {
      const res = await authAxios.get("/api/playlist/getPlaylist");
      const data = (await res.data) as Playlist[];
      const myPlaylist = data.filter((v) => v.owner.id === userId);
      setListData(myPlaylist);
    };
    fetchData();
  }, [isLoggedIn, userId]);

  return (
    <div>
      {isLoggedIn ? (
        <Link href="/playlist">
          <h1 className="cursor-pointer hover:underline">
            나만의 플레이리스트를 만들어보세요.
          </h1>
        </Link>
      ) : (
        <h1 className="cursor-not-allowed">
          나만의 플레이리스트를 만들어보세요.
        </h1>
      )}
      <div className="relative">
        <div className="w-[90%] ml-[5%]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            className="swiper"
            navigation={{
              prevEl: ".playlist-prev",
              nextEl: ".playlist-next",
            }}
            modules={[Navigation]}
          >
            {!isLoggedIn && listData.length === 0 ? (
              <button
                className="h-[150px] w-full flex justify-center items-center hover:bg-(--primary-blue-hover)"
                onClick={handleAddPlayListBtn}
              >
                <FaPlus />
              </button>
            ) : listData.length === 0 ? (
              Array.from({ length: 10 }).map((_, i) => (
                <SwiperSlide key={i} style={{ width: "150px" }}>
                  <TrackCardSkeleton />
                </SwiperSlide>
              ))
            ) : (
              listData.map((data) => (
                <SwiperSlide key={data.id} style={{ width: "150px" }}>
                  <Link href={`/playlist/${data.id}`}>
                    <TrackCard
                      key={data.id}
                      imageUrl={data.images?.[0]?.url || "/goorm_logo_blue.png"}
                      name={data.name}
                    />
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <SwiperArrow classPrev="playlist-prev" classNext="playlist-next" />
      </div>
      <SuggestLoginModal />
    </div>
  );
}
