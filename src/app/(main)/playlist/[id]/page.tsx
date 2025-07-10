/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import PlayBar from "@/domains/main/components/PlayBar";
import FollowBtn from "@/domains/playlist/components/FollowBtn";
import PlayListDetailInfo from "@/domains/playlist/components/PlayListDetailInfo";
import PlayListEditBox from "@/domains/playlist/components/PlayListEditBox";
import {
  PlaylistDetail,
  PlaylistItem,
} from "@/domains/playlist/types/Playlist";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export interface DeleteInfo {
  uri: string;
  position: number;
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const searchParmas = useSearchParams();
  const id = params.id;
  const pageName = searchParmas.get("page");
  const { userId } = userSpotifyStore();
  const [canEdit, setCanEdit] = useState(false);
  const [listData, setListData] = useState<PlaylistDetail | null>(null);
  const [snapshotId, setSnapshotId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const [isEdit, setIsEdit] = useState(false);
  const [tracks, setTracks] = useState<PlaylistItem[]>([]);
  const [deleteTracks, setDeleteTracks] = useState<DeleteInfo[]>([]);

  const handleChangeChk = (
    e: React.ChangeEvent<HTMLInputElement>,
    uri: string,
    idx: number
  ) => {
    if (e.target.checked) {
      setDeleteTracks((prev) => [...prev, { uri, position: idx }]);
    } else {
      setDeleteTracks((prev) =>
        prev.filter((track) => !(track.uri === uri && track.position === idx))
      );
    }
  };

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

  const handleTrackDelBtn = async () => {
    if (deleteTracks.length === 0) {
      alert("삭제할 데이터를 선택해주세요.");
      return;
    }

    try {
      await authAxios.delete("/api/playlist/removePlaylistItem", {
        data: {
          id,
          tracks: deleteTracks,
          snapshot_id: snapshotId,
        },
      });
      alert("트랙이 삭제되었습니다.");
      fetchData();
    } catch (err) {
      console.log("트랙 삭제 오류", err);
    }
  };

  const handlePlaylistDelBtn = async () => {
    try {
      await fetch(`/api/playlist/deletePlaylist?playlistId=${id}`, {
        method: "DELETE",
      });
      alert("플레이리스트가 삭제 되었습니다.");
      router.push("/playlist");
    } catch (err) {
      console.log("플리 삭제 오류", err);
    }
  };

  const fetchData = async () => {
    const res = await authAxios.get(`/api/playlist/getPlaylistDetail?id=${id}`);
    const data = res.data;
    if (data.owner.id === userId) {
      setCanEdit(true);
      setDescription(data.description);
    } else {
      setDescription(data.owner.display_name);
    }
    setListData(data);
    setSnapshotId(data.snapshot_id);
    setName(data.name);
    setIsPublic(data.public);
    setTracks([...data.tracks.items]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>나의 플레이리스트</h1>
      {listData && (
        <div className="flex flex-col gap-2 items-center md:flex-row md:items-start">
          <div
            className={`md:flex flex-col md:w-[40%] ${
              !canEdit ? "md:mt-2" : "md:mt-8"
            }`}
          >
            <PlayListDetailInfo
              listData={listData}
              setIsEdit={setIsEdit}
              handlePlaylistDelBtn={handlePlaylistDelBtn}
              canEdit={canEdit}
            />
            <PlayListEditBox
              isEdit={isEdit}
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              handleEditPlaylist={handleEditPlaylist}
            />
          </div>
          <div className="w-full">
            {canEdit ? (
              <button
                className="text-2xl block ml-auto"
                onClick={handleTrackDelBtn}
              >
                <MdDelete />
              </button>
            ) : (
              <button
                className="errorBtn px-1.5 py-1 flex gap-2 items-center text-white ml-auto"
                onClick={handlePlaylistDelBtn}
              >
                <FaMinus />
                팔로우 취소
              </button>
            )}
            {pageName === "follow" && <FollowBtn followId={id as string} />}

            {tracks && tracks.length > 0 ? (
              <PlayBar
                tracks={tracks}
                selectable={true}
                handleChangeChk={handleChangeChk}
                canEdit={canEdit}
              />
            ) : (
              <p className="text-sm text-gray-400 p-4">
                플레이리스트에 트랙이 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
