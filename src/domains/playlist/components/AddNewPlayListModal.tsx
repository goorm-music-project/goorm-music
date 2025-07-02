"use client";

import Modal from "@/domains/common/components/Modal";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Playlist } from "../types/Playlist";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");

  const handleAddNewPlaylist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }
    try {
      const addPlaylistRes = await fetch("/api/playlist/addPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          description,
          isPublic,
        }),
      });
      const playlistId = await addPlaylistRes.json();

      await fetch("/api/playlist/addTrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId, track }),
      });

      const res = await fetch("/api/playlist/getPlaylist");
      const data = await res.json();
      setPlaylists(data);

      setName("");
      setDescription("");
      setIsPublic("true");
      onClose();
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    }
  };
  // if (isLoading) return <LoadingSpinner />;
  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="w-[80vw] h-[300px] flex flex-col gap-2">
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
            <label>공개 여부</label>
            <select
              className="my-2"
              name="public"
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value)}
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
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
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
