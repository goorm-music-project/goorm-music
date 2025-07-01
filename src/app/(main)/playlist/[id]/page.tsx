"use client";
import PlayBar from "@/domains/main/components/PlayBar";
import {
  PlaylistDetail,
  PlaylistItem,
} from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";

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
    const res = await fetch(`/api/playlist/getPlaylistDetail?id=${id}`);
    const data = await res.json();
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
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={listData.images?.[0]?.url || "/goorm_logo_blue.png"}
            alt={listData.name}
            width={200}
            height={200}
            className="rounded"
          />
          <div>
            <button
              className="text-2xl"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              <TiPencil />
            </button>
            <button className="text-2xl" onClick={handlePlaylistDelBtn}>
              <MdDelete />
            </button>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEdit}
                className="text-center"
                style={{ border: isEdit ? "" : "none" }}
              />
              <input
                type="text"
                className=" text-center my-2"
                name="description"
                value={description}
                disabled={!isEdit}
                onChange={(e) => setDescription(e.target.value)}
                style={{ border: isEdit ? "" : "none" }}
              />
              <select
                className="text-center"
                name="public"
                value={isPublic}
                disabled={!isEdit}
                onChange={(e) => setIsPublic(e.target.value)}
                style={{
                  appearance: isEdit ? "auto" : "none",
                  border: isEdit ? "" : "none",
                }}
              >
                <option value="true">공개</option>
                <option value="false">비공개</option>
              </select>
            </div>
            {isEdit ? (
              <button className="text-2xl" onClick={handleEditPlaylist}>
                <RiSave3Fill />
              </button>
            ) : null}
          </div>
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
