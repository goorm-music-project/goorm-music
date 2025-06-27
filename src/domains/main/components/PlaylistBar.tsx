import Image from "next/image";
import React, { Dispatch } from "react";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import PlaybarCover from "@/domains/playlist/components/PlaybarCover";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

interface PlayListBarProps {
  item: PlaylistItem;
  setSelectTrack?: Dispatch<React.SetStateAction<string[]>>;
  handleShowPlayList?: () => void;
}

export default function PlaylistBar({
  item,
  setSelectTrack,
  handleShowPlayList,
}: PlayListBarProps) {
  const { userId } = userSpotifyStore.getState();
  return (
    <div
      key={item.track.id}
      className="relative p-2 hover:bg-(--primary-blue-hover) group"
    >
      <div className="flex gap-3">
        <Image
          src={item.track.album.images[0]?.url}
          alt={item.track.name}
          width={100}
          height={100}
        />
        <div className="w-[40%]">
          <p className="truncate my-1">{item.track.name}</p>
          <p className="truncate">
            {item.track.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      </div>
      {userId ? (
        <PlaybarCover
          item={item}
          setSelectTrack={setSelectTrack}
          handleShowPlayList={handleShowPlayList}
        />
      ) : null}
    </div>
  );
}
