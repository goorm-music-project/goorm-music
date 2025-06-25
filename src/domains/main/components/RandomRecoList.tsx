"use client";

import { useCallback, useEffect, useState } from "react";
import PlaylistBar from "./PlaylistBar";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import { Playlist, PlaylistItem } from "@/domains/playlist/types/Playlist";
import { useLikedStore } from "../stores/useLikedStore";

export default function RandomRecoList() {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [selectTrack, setSelectTrack] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const setLikedTracks = useLikedStore((state) => state.setLikedTracks);

  const handleShowPlayList = () => {
    setShowPlayListModal(true);
  };
  const handleShowNewPlayList = () => {
    setShowAddNewPlayListModal(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchLikedTracks = useCallback(async () => {
    try {
      const res = await fetch("/api/likedTracks");
      const data = await res.json();
      setLikedTracks(data.trackIds);
    } catch (err) {
      console.log("❌ 좋아요 리스트 실패", err);
    }
  }, [setLikedTracks]);

  useEffect(() => {
    fetch("/api/randomRecoList")
      .then((res) => res.json())
      .then((data) => setDatas(data));
    fetchLikedTracks();
  }, [setLikedTracks]);

  return (
    <main className="mb-4">
      <h1>새로운 취향을 만나보세요.</h1>
      <div className="flex flex-col gap-3">
        {datas.map((item) => (
          <PlaylistBar
            key={item.track.id}
            item={item}
            setSelectTrack={setSelectTrack}
            handleShowPlayList={handleShowPlayList}
          />
        ))}
      </div>
      <PlayListModal
        showModal={showPlayListModal}
        onClose={() => setShowPlayListModal(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
        onShowNewPlaylist={() => handleShowNewPlayList()}
        track={selectTrack}
      />

      <AddNewPlayListModal
        showModal={showAddNewPlayListModal}
        onClose={() => setShowAddNewPlayListModal(false)}
        setPlaylists={setPlaylists}
        track={selectTrack}
      />
    </main>
  );
}
