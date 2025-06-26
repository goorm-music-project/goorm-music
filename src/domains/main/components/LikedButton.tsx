import React, { useCallback, useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

interface LikedButtonProps {
  trackId: string;
}

export default function LikedButton({ trackId }: LikedButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikedTracks = useCallback(async () => {
    try {
      const res = await fetch(`/api/isLiked?trackId=${trackId}`);
      const data = await res.json();
      setIsLiked(data.data);
    } catch (err) {
      console.log("❌ 좋아요 리스트 실패", err);
    }
  }, [trackId]);

  const toggleLiked = async (trackId: string) => {
    const liked = !isLiked;
    setIsLiked(liked);
    await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackId, liked }),
    });
  };

  useEffect(() => {
    fetchLikedTracks();
  }, [fetchLikedTracks]);

  return (
    <button
      className="text-2xl absolute right-15 top-[40%] text-white"
      onClick={() => toggleLiked(trackId)}
    >
      {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
    </button>
  );
}
