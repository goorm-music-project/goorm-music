import TrackCard from "@/domains/common/components/TrackCard";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TrackCardSkeleton from "@/domains/common/components/TrackCardSkeleton";
import SwiperArrow from "@/domains/common/components/SwiperArrow";

interface Props {
  items: Array<{
    id: string;
    name: string;
    images: { url: string }[];
  }>;
}

export default function AlbumSection({ data }: { data: Props }) {
  return (
    <div className="h-[20vh] relative">
      <div className="w-[90%] ml-[5%]">
        {data.items.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            className="albumSwiper"
            navigation={{
              prevEl: ".searchAlbum-prev",
              nextEl: ".searchAlbum-next",
            }}
            modules={[Navigation]}
          >
            {data.items.length === 0
              ? Array.from({ length: 10 }).map((_, i) => (
                  <SwiperSlide key={i} style={{ width: "150px" }}>
                    <TrackCardSkeleton />
                  </SwiperSlide>
                ))
              : data?.items?.map((item) => (
                  <SwiperSlide key={item.id} style={{ width: "150px" }}>
                    <Link href={`/album/${item.id}`} key={item.id}>
                      <TrackCard
                        key={item.id}
                        imageUrl={item.images?.[0]?.url}
                        name={item.name}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        )}
      </div>
      <SwiperArrow classPrev="searchAlbum-prev" classNext="searchAlbum-next" />
    </div>
  );
}
