"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Modal from "@/domains/common/components/Modal";
import { useSpotifyStore } from "@/domains/common/stores/useSpotifyStore";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Playlist } from "../types/Playlist";

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
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useSpotifyStore.getState();
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
      setIsLoading(true);

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

      //TODO : 신규 트랙 추가 후 0곡 출력 오류
      // const res = await fetch("/api/playlist/getPlaylist");
      // const data = await res.json();
      // setPlaylists(data);
      const playlistDetailRes = await fetch(
        `/api/spotify/playlists/${playlistId}`
      );
      const playlistDetail = await playlistDetailRes.json();

      setPlaylists((prev) => [playlistDetail, ...prev]);

      setName("");
      setDescription("");
      setIsPublic("true");
      onClose();
    } catch (err) {
      console.log("플리 추가 오류 ", err);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingSpinner />;
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
