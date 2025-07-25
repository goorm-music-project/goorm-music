import LikedButton from "@/domains/common/components/LikedButton";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PlaylistItem } from "../../playlist/types/Playlist";

interface PlaybarCoverProps {
  item: PlaylistItem;
  setSelectTrack?: Dispatch<React.SetStateAction<string>>;
  handleShowPlayList?: () => void;
  likedMap: Record<string, boolean>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowAlertModal: Dispatch<SetStateAction<boolean>>;
}
export default function PlaybarCover({
  item,
  handleShowPlayList,
  setSelectTrack,
  likedMap,
  setMessage,
  setShowAlertModal,
}: PlaybarCoverProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedMap[item.track.id] ?? false);
  }, [likedMap, item.track.id]);

  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
      <div>
        <LikedButton
          trackId={item.track.id}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          setMessage={setMessage}
          setShowAlertModal={setShowAlertModal}
          className="absolute right-15 top-[36%] pointer-events-auto"
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
