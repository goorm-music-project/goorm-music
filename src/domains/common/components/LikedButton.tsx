import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import authAxios from "../lib/axios/authAxios";

interface LikedButtonProps {
  trackId: string;
  className?: string;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LikedButton({
  trackId,
  className = "",
  isLiked,
  setIsLiked,
}: LikedButtonProps) {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const toggleLiked = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    trackId: string
  ) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    const liked = !isLiked;
    setIsLiked(liked);
    await authAxios.post("/api/like", {
      trackId,
      liked,
    });
  };

  return (
    <>
      <button
        className={`text-2xl text-(--primary-blue) ${className ?? ""}`}
        onClick={(e) => toggleLiked(e, trackId)}
      >
        {isLiked ? <FaThumbsUp size={30} /> : <FaRegThumbsUp size={30} />}
      </button>
      <SuggestLoginModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
