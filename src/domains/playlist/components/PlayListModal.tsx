import React, { Dispatch, SetStateAction } from "react";
import Modal from "../../common/components/Modal";
import { FaPlus } from "react-icons/fa";
import PlayList from "./PlayList";
import { Playlist } from "../types/Playlist";

type Props = {
  showModal: boolean;
  onClose: () => void;
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  onShowNewPlaylist: () => void;
  track: string;
};

export default function PlayListModal({
  showModal,
  onClose,
  playlists,
  setPlaylists,
  onShowNewPlaylist,
  track,
}: Props) {
  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="w-[80vw] min-h-[300px] max-h-[500px] flex flex-col gap-2">
        <h2>플레이리스트 추가</h2>
        <div className="overflow-y-auto min-h-[220px]">
          <PlayList
            playlists={playlists}
            setPlaylists={setPlaylists}
            track={track as string}
          />
        </div>
        <button
          onClick={onShowNewPlaylist}
          className="primaryBtn flex gap-2 items-center justify-center p-1 w-[200px] ml-auto"
        >
          <FaPlus />새 플레이리스트 만들기
        </button>
      </div>
    </Modal>
  );
}
