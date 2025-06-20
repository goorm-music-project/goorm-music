"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type TrackItem = {
  track: {
    id: string;
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
};

export default function TopChartList() {
  const [datas, setDatas] = useState<TrackItem[]>([]);

  useEffect(() => {
    fetch("/api/topChart")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  console.log(datas);
  return (
    <main className="mb-4">
      <h1>추천 음악을 들어보세요.</h1>
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
            <SwiperSlide key={item.track.id} style={{ width: "150px" }}>
              <div key={item.track.id}>
                <Image
                  src={item.track.album.images[0]?.url}
                  alt={item.track.name}
                  width={150}
                  height={150}
                />
                <div>
                  <p className="truncate my-1">{item.track.name}</p>
                  <p className="truncate">
                    {item.track.artists.map((a) => a.name).join(", ")}
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
