"use client";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { getUserGenres } from "@/domains/select-genre/lib/getUserGenres";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
      const genreArr = await getUserGenres(userId as string);
      const genre = genreArr[Math.floor(Math.random() * genreArr.length)];
      const res = await fetch(`/api/jenreRecoList?genre=${genre}`);
      const json = await res.json();
      const data = json.slice(0, 10);
      setDatas(data);
    };

    if (userId) fetchData();
  }, [userId]);

  return (
    <main className="mb-4">
      <h1>추천 장르를 들어보세요.</h1>
      <div className="w-[100vw]">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="recoSwiper"
        >
          {datas.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ width: "150px" }}
              onClick={() => router.push(`/track/${item.id}`)}
            >
              <div>
                <Image
                  src={item.album.images[0]?.url}
                  alt={item.album.name}
                  width={150}
                  height={150}
                />
                <div>
                  <p className="truncate my-1">{item.album.name}</p>
                  <p className="truncate">
                    {item.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
