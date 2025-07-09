import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { PlaylistDetail } from "../types/Playlist";

interface Props {
  listData: PlaylistDetail;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlaylistDelBtn: () => void;
}

export default function PlayListDetailInfo({
  listData,
  setIsEdit,
  handlePlaylistDelBtn,
}: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src={listData.images?.[0]?.url || "/goorm_logo_blue.png"}
        alt={listData.name}
        width={250}
        height={250}
        className="rounded"
      />
      <div className="text-center">
        <button className="text-2xl" onClick={() => setIsEdit((prev) => !prev)}>
          <TiPencil />
        </button>
        <button className="text-2xl" onClick={handlePlaylistDelBtn}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
