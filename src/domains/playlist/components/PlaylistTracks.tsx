import React, { useState } from "react";
import FollowBtn from "./FollowBtn";
import PlayBar from "@/domains/main/components/PlayBar";
import { DeleteInfo } from "@/app/(main)/playlist/[id]/page";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { usePlaylistProps } from "../stores/usePlaylistProps";
import { useAlertModalStore } from "@/domains/common/stores/useAlertModalStore";

interface Props {
  id: string;
  fetchData: () => void;
}

export default function PlaylistTracks({ id, fetchData }: Props) {
  const [deleteTracks, setDeleteTracks] = useState<DeleteInfo[]>([]);
  const [deleting, setDeleting] = useState(false);
  const { canEdit, tracks, snapshotId } = usePlaylistProps();
  const { setMessage, setShowAlertModal } = useAlertModalStore();

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
  return (
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
        <FollowBtn followId={id as string} />
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
  );
}
