"use client";

import LikedButton from "@/domains/common/components/LikedButton";
import { useEffect, useState } from "react";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { FaPlus } from "react-icons/fa";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist } from "@/domains/playlist/types/Playlist";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";

interface TrackActionBtnsProps {
  trackId: string;
}

export default function TrackActionBtns({ trackId }: TrackActionBtnsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showPlayListModal, setShowPlayListModal] = useState<boolean>(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      if (!trackId || !isLoggedIn) return;
      try {
        const res = await authAxios.get(`/api/isLiked?trackId=${trackId}`);
        const result = res.data;

        setIsLiked(result.data);
      } catch (err) {
        console.error("좋아요 상태 가져오기 실패", err);
      }
    };

    fetchLikedTracks();
  }, [trackId, isLoggedIn]);

  return (
    <div className="relative flex flex-col items-center mt-4">
      <PlayListModal
        showModal={showPlayListModal}
        onClose={() => setShowPlayListModal(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
        onShowNewPlaylist={() => setShowAddNewPlayListModal(true)}
        track={"spotify:track:" + trackId}
      />
      <AddNewPlayListModal
        showModal={showAddNewPlayListModal}
        onClose={() => setShowAddNewPlayListModal(false)}
        setPlaylists={setPlaylists}
        track={trackId}
      />
      <div className="flex text-(--primary-blue)">
        <LikedButton
          trackId={trackId}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          className="ml-5 mr-5"
        />
        <FaPlus
          size={30}
          className="ml-5 mr-5 cursor-pointer"
          onClick={() => setShowPlayListModal(true)}
        />
      </div>
    </div>
  );
}
