"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "./Modal";
import {
  addNewPlaylist,
  addTrackToPlaylist,
  getPlaylist,
} from "../lib/playlist";
import { Playlist } from "../types/Playlist";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

interface Props {
  showModal: boolean;
  onClose: () => void;
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  track: string[];
}

export default function AddNewPlayListModal({
  showModal,
  onClose,
  setPlaylists,
  track,
}: Props) {
  const { accessToken, userId } = userSpotifyStore.getState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");

  const handleAddNewPlaylist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken || !userId) {
      console.error("accessToken 또는 userId가 없습니다.");
      return;
    }
    try {
      const playlistId = await addNewPlaylist({
        userId,
        accessToken,
        name,
        description,
        isPublic,
      });
      addTrackToPlaylist({ accessToken, playlistId, track });

      //TODO : 신규 트랙 추가 후 0곡 출력 오류
      const playlistData = await getPlaylist(accessToken);
      setPlaylists(playlistData);

      // const playlistData = await getPlaylistDetail({ accessToken, playlistId });
      // setPlaylists((prev) => [playlistData, ...prev]);

      setName("");
      setDescription("");
      setIsPublic("true");
      onClose();
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
    }
  };

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
