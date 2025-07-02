"use client";

import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikedButton from "@/domains/common/components/LikedButton";
import { useEffect, useState } from "react";

interface TrackActionBtnsProps {
  trackId: string;
}

export default function TrackActionBtns({ trackId }: TrackActionBtnsProps) {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (!trackId) return;

    const fetchLikedTracks = async () => {
      try {
        const res = await fetch(`/api/isLiked?trackId=${trackId}`);
        const result = await res.json();

        setIsLiked(result.data);
      } catch (err) {
        console.error("좋아요 상태 가져오기 실패", err);
      }
    };

    fetchLikedTracks();
  }, [trackId]);

  return (
    <div className="relative flex flex-col items-center mt-4">
      <div className="flex text-(--primary-blue)">
        <LikedButton
          trackId={trackId}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          className="ml-5 mr-5"
        />
        <FaPlay size={30} className="ml-5 mr-5" />
        <HiOutlineDotsVertical size={30} className="ml-5 mr-5 cursor-pointer" />
      </div>
    </div>
  );
}
