/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import PlayListDetailInfo from "./PlayListDetailInfo";
import PlayListEditBox from "./PlayListEditBox";
import { usePlaylistStore } from "../stores/usePlaylist";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { useRouter } from "next/navigation";
import { PlaylistDetail } from "../types/Playlist";
import { usePlaylistProps } from "../stores/usePlaylistProps";
import { useAlertModalStore } from "@/domains/common/stores/useAlertModalStore";

interface Props {
  id: string;
}

export default function PlaylistSidebar({ id }: Props) {
  const router = useRouter();
  const { playlistStore, setPlaylistsStore } = usePlaylistStore();
  const [isEdit, setIsEdit] = useState(false);
  const { canEdit, name, description, isPublic } = usePlaylistProps();
  const { setMessage, setShowAlertModal } = useAlertModalStore();

  const handleEditPlaylist = async () => {
    if (!id) {
      console.log("플레이리스트 아이디가 없습니다.");
      return;
    }
    try {
      await authAxios.put("/api/playlist/editPlaylistDetail", {
        id,
        name,
        description,
        isPublic,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsEdit(false);
    }
  };

  const handlePlaylistDelBtn = async () => {
    try {
      await fetch(`/api/playlist/deletePlaylist?playlistId=${id}`, {
        method: "DELETE",
      });

      const updatedPlaylists = playlistStore.filter(
        (playlist) => playlist.id !== id
      );
      setPlaylistsStore(updatedPlaylists);

      setMessage("플레이리스트가 삭제 되었습니다.");
      setShowAlertModal(true);
      router.push("/playlist");
    } catch (err) {
      console.log("플리 삭제 오류", err);
    }
  };
  return (
    <div
      className={`lg:flex flex-col lg:w-[40%] ${
        !canEdit ? "lg:mt-2" : "lg:mt-8"
      }`}
    >
      <PlayListDetailInfo
        setIsEdit={setIsEdit}
        handlePlaylistDelBtn={handlePlaylistDelBtn}
      />
      <PlayListEditBox
        isEdit={isEdit}
        handleEditPlaylist={handleEditPlaylist}
      />
    </div>
  );
}
