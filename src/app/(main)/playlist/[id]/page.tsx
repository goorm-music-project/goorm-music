/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AlertModal from "@/domains/common/components/AlertModal";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { usePlaylistStore } from "@/domains/playlist/stores/usePlaylist";
import PlayBar from "@/domains/main/components/PlayBar";
import FollowBtn from "@/domains/playlist/components/FollowBtn";
import PlayListDetailInfo from "@/domains/playlist/components/PlayListDetailInfo";
import PlayListEditBox from "@/domains/playlist/components/PlayListEditBox";
import {
  PlaylistDetail,
  PlaylistItem,
} from "@/domains/playlist/types/Playlist";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface DeleteInfo {
  uri: string;
  position: number;
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { userId } = userSpotifyStore();
  const { playlistStore, setPlaylistsStore } = usePlaylistStore();
  const [canEdit, setCanEdit] = useState<null | boolean>(null);
  const [listData, setListData] = useState<PlaylistDetail | null>(null);
  const [snapshotId, setSnapshotId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const [isEdit, setIsEdit] = useState(false);
  const [tracks, setTracks] = useState<PlaylistItem[]>([]);
  const [deleteTracks, setDeleteTracks] = useState<DeleteInfo[]>([]);
  const [message, setMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      setMessage("삭제할 데이터를 선택해주세요.");
      setShowAlertModal(true);
      return;
    }

    try {
      setDeleting(true);
      await authAxios.delete("/api/playlist/removePlaylistItem", {
        data: {
          id,
          tracks: deleteTracks,
          snapshot_id: snapshotId,
        },
      });
      setMessage("트랙이 삭제 되었습니다.");
      setShowAlertModal(true);
      fetchData();
    } catch (err) {
      console.log("트랙 삭제 오류", err);
    } finally {
      setDeleting(false);
    }
  };

  const handlePlaylistDelBtn = async () => {
    try {
      await fetch(`/api/playlist/deletePlaylist?playlistId=${id}`, {
        method: "DELETE",
      });
      
      const updatedPlaylists = playlistStore.filter(playlist => playlist.id !== id);
      setPlaylistsStore(updatedPlaylists);
      
      setMessage("플레이리스트가 삭제 되었습니다.");
      setShowAlertModal(true);
      router.push("/playlist");
    } catch (err) {
      console.log("플리 삭제 오류", err);
    }
  };

  const decodeHtmlEntities = (str: string) => {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#x27;/g, "`");
  };

  const fetchData = async () => {
    const res = await authAxios.get(`/api/playlist/getPlaylistDetail?id=${id}`);
    const data = res.data;
    if (data.owner.id === userId) {
      setCanEdit(true);
      const text = decodeHtmlEntities(data.description);
      setDescription(text);
    } else {
      setDescription(data.owner.display_name);
      setCanEdit(false);
    }
    setListData(data);
    setSnapshotId(data.snapshot_id);
    setName(data.name);
    setIsPublic(data.public);
    setTracks([...data.tracks.items]);
  };

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [userId]);

  if (canEdit === null) return <LoadingSpinner />;

  return (
    <div>
      {canEdit && <h1>나의 플레이리스트</h1>}

      {listData && (
        <div className="flex flex-col gap-2 items-center lg:flex-row lg:items-start">
          <div
            className={`lg:flex flex-col lg:w-[40%] ${
              !canEdit ? "lg:mt-2" : "lg:mt-8"
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
              handleEditPlaylist={handleEditPlaylist}
            />
          </div>
          <div className="w-full">
            {canEdit ? (
              <button
                className="errorBtn py-1.5 px-2 block ml-auto"
                onClick={handleTrackDelBtn}
                disabled={deleting}
              >
                {deleting ? "삭제중..." : "트랙 삭제"}
              </button>
            ) : (
              <FollowBtn
                followId={id as string}
                setShowLoginModal={setShowLoginModal}
                setShowAlertModal={setShowAlertModal}
                setMessage={setMessage}
              />
            )}

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
      <SuggestLoginModal
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <AlertModal
        showModal={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        message={message}
      />
    </div>
  );
}
