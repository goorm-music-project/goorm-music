"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";

type RandomItem = {
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

export default function RandomRecoList() {
  const [datas, setDatas] = useState<RandomItem[]>([]);

  useEffect(() => {
    fetch("/api/randomRecoList")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  return (
    <main className="mb-4">
      <h1>새로운 취향을 만나보세요.</h1>
      <div className="flex flex-col gap-3">
        {datas.map((item) => (
          <div
            key={item.track.id}
            className="relative p-2 hover:bg-(--primary-blue-hover) group"
          >
            <div className="flex gap-3">
              <Image
                src={item.track.album.images[0]?.url}
                alt={item.track.name}
                width={100}
                height={100}
              />
              <div>
                <p className="truncate my-1">{item.track.name}</p>
                <p className="truncate">
                  {item.track.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="absolute left-0 top-0 w-full h-full hidden group-hover:block">
              <button className="text-2xl absolute left-12 top-[40%] text-white">
                <FaPlay />
              </button>
              <div>
                <button className="text-2xl absolute right-15 top-[40%] text-white">
                  <FaRegThumbsUp />
                </button>
                <button className="text-2xl absolute right-5 top-[40%] text-white">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
