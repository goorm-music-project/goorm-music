import TrackCard from "@/domains/common/components/TrackCard";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { Navigation } from "swiper/modules";
import SwiperArrow from "@/domains/common/components/SwiperArrow";

interface Props {
  artistId: string;
}

type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
};

export default function ArtistAlbums({ artistId }: Props) {
  const [ablums, setAblums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appAxios.get(`/api/artist/${artistId}/albums`);
        const data = await res.data;
        setAblums(data);
      } catch (err) {
        console.log("아티스트 앨범 불러오기 오류", err);
      }
    };
    fetchData();
  }, [artistId]);

  return (
    <div>
      <h1>아티스트의 앨범을 만나보세요.</h1>
      <div className="relative">
        <div className="w-[90%] ml-[5%]">
          {ablums && (
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              className="w-full"
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Navigation]}
            >
              {ablums.map((track) => (
                <SwiperSlide
                  key={track.images?.[0].url + track.name}
                  className="!w-[150px]"
                >
                  <Link href={`/album/${track.id}`}>
                    <TrackCard
                      imageUrl={track.images?.[0].url}
                      name={track.name}
                      artists={[track.artists[0].name]}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <SwiperArrow />
      </div>
    </div>
  );
}
