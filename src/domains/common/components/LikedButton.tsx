/* eslint-disable react-hooks/exhaustive-deps */
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import authAxios from "../lib/axios/authAxios";
import useDebounce from "../hooks/useDebounce";

interface LikedButtonProps {
  trackId: string;
  className?: string;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowAlertModal: Dispatch<SetStateAction<boolean>>;
}

export default function LikedButton({
  trackId,
  className = "",
  isLiked,
  setIsLiked,
  setMessage,
  setShowAlertModal,
}: LikedButtonProps) {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const debouncedClick = useDebounce(isLiked, 2000);

  const toggleLiked = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowModal(true);
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
      <SuggestLoginModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
