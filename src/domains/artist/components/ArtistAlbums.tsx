import TrackCard from "@/domains/common/components/TrackCard";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
        const res = await fetch(`/api/artist/${artistId}/albums`);
        const data = await res.json();
        setAblums(data);
      } catch (err) {
        console.log("아티스트 앨범 불러오기 오류", err);
      }
    };
    fetchData();
  }, [artistId]);

  return (
    <div>
      <h2>아티스트의 앨범을 만나보세요.</h2>
      {ablums && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="w-full"
        >
          {ablums.map((track) => (
            <SwiperSlide
              key={track.images?.[0].url + track.name}
              className="!w-[150px]"
            >
              <TrackCard
                imageUrl={track.images?.[0].url}
                name={track.name}
                artists={[track.artists[0].name]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
