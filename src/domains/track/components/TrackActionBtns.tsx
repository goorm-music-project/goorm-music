"use client";

import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikedButton from "@/domains/common/components/LikedButton";

interface TrackActionBtnsProps {
  trackId: string;
}

export default function TrackActionBtns({ trackId }: TrackActionBtnsProps) {
  return (
    <div className="relative flex flex-col items-center mt-4">
      <div className="flex text-(--primary-blue)">
        <LikedButton trackId={trackId} className="ml-5 mr-5" />
        <FaPlay size={30} className="ml-5 mr-5" />
        <HiOutlineDotsVertical size={30} className="ml-5 mr-5 cursor-pointer" />
      </div>
    </div>
  );
}
