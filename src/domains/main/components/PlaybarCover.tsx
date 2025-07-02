import LikedButton from "@/domains/common/components/LikedButton";
import React, { Dispatch } from "react";
import { FaPlus } from "react-icons/fa";
import { PlaylistItem } from "../../playlist/types/Playlist";

interface PlaybarCoverProps {
  item: PlaylistItem;
  setSelectTrack?: Dispatch<React.SetStateAction<string>>;
  handleShowPlayList?: () => void;
}
export default function PlaybarCover({
  item,
  handleShowPlayList,
  setSelectTrack,
}: PlaybarCoverProps) {
  return (
    <div className="absolute left-0 top-0 w-full h-full">
      <div>
        <LikedButton
          trackId={item.track.id}
          className="absolute right-15 top-[36%]"
        />
        <button
          className="text-2xl absolute right-5 top-[40%] text-(--primary-blue) pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
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
