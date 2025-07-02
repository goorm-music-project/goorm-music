import React, { useCallback, useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

interface LikedButtonProps {
  trackId: string;
  className?: string;
}

export default function LikedButton({
  trackId,
  className = "",
}: LikedButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikedTracks = useCallback(async () => {
    try {
      const res = await fetch(`/api/isLiked?trackId=${trackId}`);
      const data = await res.json();
      setIsLiked(data.data);
    } catch (err) {
      console.error("❌ 좋아요 눌렀는지 확인하기 실패", err);
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
      className={`text-2xl text-(--primary-blue) ${className ?? ""}`}
      onClick={() => toggleLiked(trackId)}
    >
      {isLiked ? <FaThumbsUp size={30} /> : <FaRegThumbsUp size={30} />}
    </button>
  );
}
