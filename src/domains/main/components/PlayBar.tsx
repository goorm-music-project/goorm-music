/* eslint-disable @typescript-eslint/no-unused-vars */
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import PlaybarCover from "@/domains/main/components/PlaybarCover";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist, PlaylistItem } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import authAxios from "@/domains/common/lib/axios/authAxios";
import AlertModal from "@/domains/common/components/AlertModal";
import PlayListBoxSkeleton from "@/domains/playlist/components/PlayListBoxSkeleton";

interface Props {
  tracks: PlaylistItem[];
  selectable?: boolean;
  handleChangeChk?: (
    e: React.ChangeEvent<HTMLInputElement>,
    uri: string,
    idx: number
  ) => void;
  className?: string;
  canEdit?: boolean;
}

export default function PlayBar({
  tracks,
  selectable,
  handleChangeChk,
  className,
  canEdit,
}: Props) {
  const { userId } = userSpotifyStore.getState();
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [selectTrack, setSelectTrack] = useState<string>("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { setSelectedTrackId } = usePlayerStore();

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
      const sliceSize = 50;

      const sliceIds = Array.from(
        { length: Math.ceil(trackIds.length / sliceSize) },
        (_, i) => trackIds.slice(i * sliceSize, i * sliceSize + sliceSize)
      );

      try {
        const resultArr: boolean[] = [];

        for (const ids of sliceIds) {
          const idsData = ids.join(",");
          const res = await authAxios.get(`/api/isLiked?trackId=${idsData}`);
          const result = await res.data;

          resultArr.push(...result.data);
        }

        const map: Record<string, boolean> = {};
        trackIds.forEach((id, idx) => {
          map[id] = resultArr[idx];
        });

        setLikedMap(map);
      } catch (err) {
        console.error("좋아요 상태 가져오기 실패", err);
      }
    };

    fetchLikedTracks();
  }, [tracks, userId]);

  return (
    <div className={className ? "grid grid-cols-1 lg:grid-cols-2 gap-2" : ""}>
      {tracks.length === 0
        ? Array.from({ length: 10 }).map((_, i) => (
            <PlayListBoxSkeleton key={i} />
          ))
        : tracks.map((item, idx) => (
            <div
              key={`${item.track.id}_${idx}`}
              className="relative p-2 flex gap-2 cursor-pointer"
            >
              {selectable && canEdit && (
                <input
                  type="checkbox"
                  className="flex-none"
                  style={{ width: "18px" }}
                  onChange={(e) => handleChangeChk?.(e, item.track.uri, idx)}
                />
              )}
              <div
                className="flex gap-3 w-full"
                onClick={() => handleClickTrack(item.track.id)}
              >
                <div className=" relative w-[100px] h-[100px]">
                  <Image
                    src={
                      item.track.album?.images[0]?.url || "/goorm_logo_blue.png"
                    }
                    alt={item.track.name}
                    fill
                    sizes="100px"
                  />
                </div>
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

      <AlertModal />
    </div>
  );
}
