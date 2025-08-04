/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { FaMinus, FaPlus } from "react-icons/fa6";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { useAlertModalStore } from "@/domains/common/stores/useAlertModalStore";
import { useLoginModalStore } from "@/domains/common/stores/useLoginModalStore";

interface Props {
  followId: string;
}

export default function FollowBtn({ followId }: Props) {
  const { userId } = userSpotifyStore();
  const [isExist, setIsExist] = useState(false);
  const { setMessage, setShowAlertModal } = useAlertModalStore();
  const { setShowLoginModal } = useLoginModalStore();

  const confirmFollow = async () => {
    if (userId === "") {
      setShowLoginModal(true);
      return;
    }
    if (!followId) return;
    try {
      await authAxios.put("/api/follow", {
        id: followId,
      });
      setMessage("Follow가 완료되었습니다.");
      fetchPlaylists();
      setShowAlertModal(true);
    } catch (err) {
      console.log("팔로우 추가 오류", err);
    }
  };

  const deleteFollow = async () => {
    try {
      await fetch(`/api/playlist/deletePlaylist?playlistId=${followId}`, {
        method: "DELETE",
      });
      setMessage("플레이리스트가 삭제 되었습니다.");
      setShowAlertModal(true);
      setIsExist(false);
    } catch (err) {
      console.log("플리 삭제 오류", err);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const res = await authAxios.get("/api/playlist/getPlaylist");
      const data = res.data;
      const myPlaylist = data.filter(
        (v: { owner: { id: string } }) => v.owner.id !== userId
      );
      setIsExist(myPlaylist.some((v: { id: string }) => v.id === followId));
    } catch (error) {
      console.error("플레이리스트 로딩 실패:", error);
    }
  };

  useEffect(() => {
    if (!userId || !followId) return;

    fetchPlaylists();
  }, [followId, userId]);

  return (
    <div>
      <div className="flex px-2 justify-end">
        {isExist ? (
          <button
            className="errorBtn px-1.5 py-1 flex gap-2 items-center text-white"
            onClick={deleteFollow}
          >
            <FaMinus />
            팔로우 취소
          </button>
        ) : (
          <button
            className="primaryBtn p-1 flex gap-2 items-center"
            onClick={confirmFollow}
          >
            <FaPlus />
            팔로우하기
          </button>
        )}
      </div>
    </div>
  );
}
