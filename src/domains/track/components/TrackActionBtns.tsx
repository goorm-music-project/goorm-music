"use client";

import LikedButton from "@/domains/common/components/LikedButton";
import { useEffect, useState } from "react";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { FaPlus } from "react-icons/fa";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist } from "@/domains/playlist/types/Playlist";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import AlertModal from "@/domains/common/components/AlertModal";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import authAxios from "@/domains/common/lib/axios/authAxios";

interface TrackActionBtnsProps {
  trackId: string;
}

export default function TrackActionBtns({ trackId }: TrackActionBtnsProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showPlayListModal, setShowPlayListModal] = useState<boolean>(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);

  const [message, setMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchIsLiked = async () => {
    try {
      const res = await authAxios.get(`/api/isLiked?trackId=${trackId}`);
      const result = res.data.data[0] as boolean;
      setIsLiked(result);
    } catch (err) {
      console.error("좋아요 상태 가져오기 실패", err);
    }
  };

  useEffect(() => {
    fetchIsLiked();
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-4">
      <PlayListModal
        showModal={showPlayListModal}
        onClose={() => setShowPlayListModal(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
        onShowNewPlaylist={() => setShowAddNewPlayListModal(true)}
        track={"spotify:track:" + trackId}
        setMessage={setMessage}
        setShowAlertModal={setShowAlertModal}
      />
      <AddNewPlayListModal
        showModal={showAddNewPlayListModal}
        onClose={() => setShowAddNewPlayListModal(false)}
        setPlaylists={setPlaylists}
        track={trackId}
        setMessage={setMessage}
        setShowAlertModal={setShowAlertModal}
      />
      <div className="flex text-(--primary-blue)">
        <LikedButton
          trackId={trackId}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          className="ml-5 mr-5"
          setMessage={setMessage}
          setShowAlertModal={setShowAlertModal}
        />
        <FaPlus
          size={30}
          className="ml-5 mr-5 cursor-pointer"
          onClick={() =>
            isLoggedIn ? setShowPlayListModal(true) : setShowLoginModal(true)
          }
        />
      </div>
      <AlertModal
        showModal={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        message={message}
      />
      <SuggestLoginModal
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
