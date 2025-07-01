"use client";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { Playlist } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MyPlayList({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [listData, setListData] = useState<Playlist[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleAddPlayListBtn = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      router.push("/playlist");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchData = async () => {
      const res = await fetch("/api/playlist/getPlaylist");
      const data = await res.json();
      setListData(data);
    };
    fetchData();
  }, [isLoggedIn]);

  return (
    <div>
      <h1>나만의 플레이리스트를 만들어보세요.</h1>
      <div className="w-[100vw]">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="swiper"
        >
          {!isLoggedIn && listData.length === 0 ? (
            <button
              className="h-[150px] w-full flex justify-center items-center hover:bg-(--primary-blue-hover)"
              onClick={handleAddPlayListBtn}
            >
              <FaPlus />
            </button>
          ) : (
            listData.map((data) => (
              <SwiperSlide key={data.id} style={{ width: "150px" }}>
                <Link href={`/playlist/${data.id}`}>
                  <div>
                    <Image
                      src={data.images?.[0]?.url || "/goorm_logo_blue.png"}
                      alt={data.name}
                      width={150}
                      height={150}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
      <SuggestLoginModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
