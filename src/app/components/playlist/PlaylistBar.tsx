import { PlaylistItem } from "@/app/types/Playlist";
import Image from "next/image";
import React, { Dispatch } from "react";
import { FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";

interface PlayListBarProps {
  item: PlaylistItem;
  setSelectTrack: Dispatch<React.SetStateAction<string[]>>;
  handleShowPlayList: () => void;
}

export default function PlaylistBar({
  item,
  setSelectTrack,
  handleShowPlayList,
}: PlayListBarProps) {
  return (
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
          <button
            className="text-2xl absolute right-5 top-[40%] text-white"
            onClick={() => {
              handleShowPlayList();
              setSelectTrack(item.track.uri);
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
