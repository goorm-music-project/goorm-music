import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import LikedButton from "@/domains/main/components/LikedButton";
import Image from "next/image";
import React, { Dispatch } from "react";
import { FaPlus } from "react-icons/fa";
interface props {
  item: {
    id: string;
    name: string;
    album: { name: string; images: { url: string }[] };
    artists: { name: string }[];
    uri: string;
  };
  handleShowPlaylist: () => void;
  setSelectTrack: Dispatch<React.SetStateAction<string>>;
}
export default function PlaylistBar({
  item,
  handleShowPlaylist,
  setSelectTrack,
}: props) {
  const { userId } = userSpotifyStore.getState();

  return (
    <div className="relative p-2 ">
      <div className="flex gap-3">
        <Image
          src={item.album.images[0]?.url}
          alt={item.name}
          width={100}
          height={100}
        />
        <div className="w-[40%]">
          <p className="truncate my-1">{item.name}</p>
          <p className="truncate">
            {item.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      </div>
      {userId ? (
        <div>
          <LikedButton trackId={item.id} />
          <button
            className="text-2xl absolute right-5 top-[40%] text-(--primary-blue)"
            onClick={() => {
              handleShowPlaylist();
              setSelectTrack(item.uri);
            }}
          >
            <FaPlus />
          </button>
        </div>
      ) : null}
    </div>
  );
}
