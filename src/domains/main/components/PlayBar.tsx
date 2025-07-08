import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import PlaybarCover from "@/domains/main/components/PlaybarCover";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist, PlaylistItem } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";
import authAxios from "@/domains/common/lib/axios/authAxios";

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
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { setSelectedTrackId } = usePlayerSotre();

  const handleClickTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
    router.push(`/track/${trackId}`);
  };

  const handleShowPlayList = () => {
    setShowPlayListModal(true);
  };
  const handleShowNewPlayList = () => {
    setShowAddNewPlayListModal(true);
  };

  useEffect(() => {
    if (!tracks || tracks.length === 0 || userId === "") return;

    const fetchLikedTracks = async () => {
      const trackIds = tracks.map((t) => t.track.id);
      try {
        const res = await authAxios.get(`/api/isLiked?trackId=${trackIds}`);
        const result = await res.data;

        const map: Record<string, boolean> = {};
        trackIds.forEach((id, idx) => {
          map[id] = result.data[idx];
        });

        setLikedMap(map);
      } catch (err) {
        console.error("좋아요 상태 가져오기 실패", err);
      }
    };

    fetchLikedTracks();
  }, [tracks]);

  return (
    <div>
      {tracks.map((item, idx) => (
        <div
          key={`${item.track.id}_${idx}`}
          className="relative p-2 hover:bg-(--primary-blue-hover) group flex gap-2"
          onClick={() => handleClickTrack(item.track.id)}
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
              likedMap={likedMap}
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
