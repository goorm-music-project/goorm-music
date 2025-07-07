"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
};

export default function NewReleaseAlbum() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetch("/api/newReleases")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <main className="mb-4">
      <h1>최신 앨범을 만나보세요.</h1>
      <div className="w-[100vw]">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="albumSwiper"
        >
          {albums.map((album) => (
            <SwiperSlide key={album.id} style={{ width: "150px" }}>
              <div>
                <Link href={`/album/${album.id}`}>
                  <Image
                    src={album.images[0]?.url}
                    alt={album.name}
                    width={150}
                    height={150}
                  />
                  <p className="truncate my-1">{album.name}</p>
                  <p className="truncate">
                    {album.artists.map((a) => a.name).join(", ")}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
