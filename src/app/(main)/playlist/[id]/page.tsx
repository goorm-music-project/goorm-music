"use client";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import PlayListDetailInfo from "@/domains/playlist/components/PlayListDetailInfo";
import PlayListEditBox from "@/domains/playlist/components/PlayListEditBox";
import {
  PlaylistDetail,
  PlaylistItem,
} from "@/domains/playlist/types/Playlist";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export interface DeleteInfo {
  uri: string;
  position: number;
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
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
      const res = await fetch("/api/playlist/editPlaylistDetail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
          isPublic,
        }),
      });
      const data = res.json();
      console.log(data);
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
      await fetch("/api/playlist/removePlaylistItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          tracks: deleteTracks,
          snapshot_id: snapshotId,
        }),
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
    const res = await appAxios.get(`/api/playlist/getPlaylistDetail?id=${id}`);
    const data = res.data;
    setListData(data);
    setSnapshotId(data.snapshot_id);
    setName(data.name);
    setDescription(data.description);
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
        <div className="flex flex-col gap-2 items-center">
          <PlayListDetailInfo
            listData={listData}
            setIsEdit={setIsEdit}
            handlePlaylistDelBtn={handlePlaylistDelBtn}
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
          <div className="w-full">
            <button
              className="text-2xl block ml-auto"
              onClick={handleTrackDelBtn}
            >
              <MdDelete />
            </button>
            {tracks && tracks.length > 0 ? (
              <PlayBar
                tracks={tracks}
                selectable={true}
                handleChangeChk={handleChangeChk}
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
