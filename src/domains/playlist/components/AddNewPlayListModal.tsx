"use client";

import Modal from "@/domains/common/components/Modal";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Playlist } from "../types/Playlist";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { usePlaylistStore } from "@/domains/playlist/stores/usePlaylist";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { useAlertModalStore } from "@/domains/common/stores/useAlertModalStore";

interface Props {
  showModal: boolean;
  onClose: () => void;
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string;
}

export default function AddNewPlayListModal({
  showModal,
  onClose,
  setPlaylists,
  track,
}: Props) {
  const { userId } = userSpotifyStore.getState();
  const { setPlaylistsStore } = usePlaylistStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const { setMessage, setShowAlertModal } = useAlertModalStore();

  const handleAddNewPlaylist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }
    try {
      setIsLoading(true);
      const addPlaylistRes = await authAxios.post("/api/playlist/addPlaylist", {
        userId,
        name,
        description,
        isPublic,
      });
      const playlistId = await addPlaylistRes.data;

      await authAxios.post("/api/playlist/addTrack", { playlistId, track });

      const res = await authAxios.get("/api/playlist/getPlaylist");
      const json = await res.data;
      const data = json.filter(
        (v: { owner: { id: string } }) => v.owner.id === userId
      );

      setPlaylists(data);
      setPlaylistsStore(data);

      setName("");
      setDescription("");
      setIsPublic("true");
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      setIsLoading(false);
      onClose();
      setMessage("새 플레이리스트가 추가되었습니다.");
      setShowAlertModal(true);
    }
  };

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="h-[230px] flex flex-col gap-2">
        <h2>새 플레이리스트</h2>
        <div className="">
          <form onSubmit={handleAddNewPlaylist} id="addPlayList">
            <label>제목</label>
            <input
              type="text"
              className="my-2"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>설명</label>
            <input
              type="text"
              className="my-2"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="ml-auto py-1 px-2 border border-(--gray) white hover:bg-(--gray) hover:text-white"
          >
            취소
          </button>
          <button
            form="addPlayList"
            type="submit"
            className="primaryBtn py-1 px-2"
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
