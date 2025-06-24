"use client";

import { useEffect, useState } from "react";
import PlayListModal from "./PlayListModal";
import AddNewPlayListModal from "./AddNewPlayListModal";
import { Playlist, PlaylistItem } from "../types/Playlist";
import PlaylistBar from "./PlaylistBar";

export default function RandomRecoList() {
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
    fetch("/api/randomRecoList")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

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
