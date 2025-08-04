/* eslint-disable react-hooks/exhaustive-deps */
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import authAxios from "../lib/axios/authAxios";
import useDebounce from "../hooks/useDebounce";
import { useLoginModalStore } from "../stores/useLoginModalStore";
import { useAlertModalStore } from "../stores/useAlertModalStore";

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
  const [hasClicked, setHasClicked] = useState(false);
  const debouncedClick = useDebounce(isLiked, 2000);
  const { setShowLoginModal } = useLoginModalStore();
  const { setMessage, setShowAlertModal } = useAlertModalStore();

  const toggleLiked = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const liked = !isLiked;
    setIsLiked(liked);
    setHasClicked(true);
  };

  const fetchLiked = async () => {
    await authAxios.post("/api/like", {
      trackId,
      isLiked,
    });
  };

  useEffect(() => {
    if (!hasClicked) return;
    fetchLiked();
    if (isLiked) {
      setMessage("좋아요 목록에 추가 되었습니다.");
    } else {
      setMessage("좋아요 목록에서 제거되었습니다.");
    }
    setShowAlertModal(true);
  }, [debouncedClick]);

  return (
    <>
      <button
        className={`text-2xl text-(--primary-blue) ${className ?? ""}`}
        onClick={(e) => toggleLiked(e)}
      >
        {isLiked ? <FaThumbsUp size={30} /> : <FaRegThumbsUp size={30} />}
      </button>
      <SuggestLoginModal />
    </>
  );
}
