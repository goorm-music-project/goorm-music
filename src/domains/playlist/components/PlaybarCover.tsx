import LikedButton from "@/domains/main/components/LikedButton";
import React, { Dispatch } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { PlaylistItem } from "../types/Playlist";

interface PlaybarCoverProps {
  item: PlaylistItem;
  setSelectTrack?: Dispatch<React.SetStateAction<string[]>>;
  handleShowPlayList?: () => void;
}
export default function PlaybarCover({
  item,
  handleShowPlayList,
  setSelectTrack,
}: PlaybarCoverProps) {
  return (
    <div className="absolute left-0 top-0 w-full h-full hidden group-hover:block">
      <button className="text-2xl absolute left-12 top-[40%] text-white">
        <FaPlay />
      </button>
      <div>
        <LikedButton trackId={item.track.id} />
        <button
          className="text-2xl absolute right-5 top-[40%] text-white"
          onClick={() => {
            handleShowPlayList?.();
            setSelectTrack?.(item.track.uri);
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
