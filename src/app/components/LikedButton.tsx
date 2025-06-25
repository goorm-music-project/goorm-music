import React from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useLikedStore } from "../stores/useLikedStore";

export default function LikedButton({ trackId }: { trackId: string }) {
  const { toggleLiked, isLiked } = useLikedStore();
  return (
    <button
      className="text-2xl absolute right-15 top-[40%] text-white"
      onClick={() => toggleLiked(trackId)}
    >
      {isLiked(trackId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
    </button>
  );
}
