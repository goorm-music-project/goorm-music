import Modal from "@/domains/common/components/Modal";
import React, { useEffect, useState } from "react";
import PlayListBox from "./PlayListBox";
import { Playlist } from "../types/Playlist";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import AlertModal from "@/domains/common/components/AlertModal";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";

interface Props {
  showModal: boolean;
  onClose: () => void;
  followId: number | null;
}

export default function FollowPlaylistModal({
  showModal,
  onClose,
  followId,
}: Props) {
  const { userId } = userSpotifyStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/playlist/getPlaylist");
      const data = await res.json();
      const myPlaylist = data.filter(
        (v: { owner: { id: string } }) => v.owner.id !== userId
      );
      setIsExist(myPlaylist.some((v) => v.id === followId));
      setPlaylists(myPlaylist);
    } catch (error) {
      console.error("플레이리스트 로딩 실패:", error);
    }
    setIsLoading(false);
  };

  const confirmFollow = async () => {
    if (!followId) return;
    try {
      await fetch("/api/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: followId,
        }),
      });
      setMessage("Follow가 완료되었습니다.");
      fetchPlaylists();
      setShowAlertModal(true);
    } catch (err) {
      console.log("팔로우 추가 오류", err);
    }
  };

  useEffect(() => {
    if (!userId || !followId) return;

    fetchPlaylists();
  }, [setPlaylists, userId, followId]);

  return (
    <>
      <Modal showModal={showModal} onClose={onClose}>
        <div className="w-[80vw] h-[400px] flex flex-col gap-2">
          <h2>Follow 한 플레이리스트</h2>
          {isExist && (
            <p className="text-(--error-red)">
              * 이미 Follow한 플레이리스트 입니다.
            </p>
          )}
          <div className="overflow-y-auto min-h-[220px] h-[320px]">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col gap-4">
                {playlists.map((playlist) => (
                  <PlayListBox key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="primaryBtn py-1 px-2 mr-2"
              onClick={confirmFollow}
              disabled={isExist}
            >
              추가 하기
            </button>
            <button
              onClick={onClose}
              className="py-1 px-2 border border-(--gray) white hover:bg-(--gray) hover:text-white"
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>

      <AlertModal
        showModal={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        message={message}
      />
    </>
  );
}
