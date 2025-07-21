import React from "react";
import { Playlist } from "../types/Playlist";
import Image from "next/image";

interface Props {
  playlist: Playlist;
  handleAddPlayList?: (playlistId: string) => void;
}

export default function PlayListBox({ playlist, handleAddPlayList }: Props) {
  return (
    <div
      key={playlist.id}
      className="flex gap-4 p-2 rounded border border-(--gray) cursor-pointer hover:bg-(--primary-blue-hover)"
      onClick={() => handleAddPlayList?.(playlist.id)}
    >
      <Image
        src={playlist.images?.[0]?.url || "/goorm_logo_blue.png"}
        alt={playlist.name}
        width={100}
        height={100}
        className="rounded"
      />
      <div className="flex flex-col justify-center w-full overflow-hidden">
        <h3 className="truncate">{playlist.name}</h3>
        <p className="truncate">{playlist.description}</p>
      </div>
    </div>
  );
}
