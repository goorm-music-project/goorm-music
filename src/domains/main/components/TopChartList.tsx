"use client";
import { useEffect, useState } from "react";

import { Playlist, PlaylistItem } from "@/domains/playlist/types/Playlist";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import PlaylistBar from "./PlaylistBar";

export default function TopChartList({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [datas, setDatas] = useState<PlaylistItem[]>([]);
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [selectTrack, setSelectTrack] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleShowPlayList = () => {
    setShowPlayListModal(true);
  };
  const handleShowNewPlayList = () => {
    setShowAddNewPlayListModal(true);
  };

  useEffect(() => {
    fetch("/api/topChart")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  return (
    <main>
      <h1>추천 음악을 들어보세요.</h1>
      {datas.map((item) => (
        <PlaylistBar
          key={item.track.id}
          item={item}
          setSelectTrack={setSelectTrack}
          handleShowPlayList={handleShowPlayList}
        />
      ))}
      {isLoggedIn && (
        <>
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
        </>
      )}
    </main>
  );
}
