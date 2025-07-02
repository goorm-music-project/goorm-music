import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import PlaybarCover from "@/domains/main/components/PlaybarCover";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist, PlaylistItem } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  tracks: PlaylistItem[];
  selectable?: boolean;
  handleChangeChk?: (
    e: React.ChangeEvent<HTMLInputElement>,
    uri: string,
    idx: number
  ) => void;
}

export default function PlayBar({
  tracks,
  selectable,
  handleChangeChk,
}: Props) {
  const { userId } = userSpotifyStore.getState();
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [selectTrack, setSelectTrack] = useState<string>("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const router = useRouter();

  const handleShowPlayList = () => {
    setShowPlayListModal(true);
  };
  const handleShowNewPlayList = () => {
    setShowAddNewPlayListModal(true);
  };
  return (
    <div>
      {tracks.map((item, idx) => (
        <div
          key={`${item.track.id}_${idx}`}
          className="relative p-2 hover:bg-(--primary-blue-hover) group flex gap-2"
          onClick={() => router.push(`/track/${item.track.id}`)}
        >
          {selectable && (
            <input
              type="checkbox"
              className="flex-none"
              style={{ width: "18px" }}
              onChange={(e) => handleChangeChk?.(e, item.track.uri, idx)}
            />
          )}
          <div className="flex gap-3 w-full">
            <Image
              src={item.track.album.images[0]?.url}
              alt={item.track.name}
              width={100}
              height={100}
            />
            <div className="w-[40%]">
              <p className="truncate my-1 w-full">{item.track.name}</p>
              <p className="truncate w-full">
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
      ))}

      <PlayListModal
        showModal={showPlayListModal}
        onClose={() => setShowPlayListModal(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
        onShowNewPlaylist={() => handleShowNewPlayList()}
        track={selectTrack}
      />

      <AddNewPlayListModal
        showModal={showAddNewPlayListModal}
        onClose={() => setShowAddNewPlayListModal(false)}
        setPlaylists={setPlaylists}
        track={selectTrack}
      />
    </div>
  );
}
