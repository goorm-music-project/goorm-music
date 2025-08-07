import { useEffect, useState } from "react";
import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";
import EmptyMessage from "./EmptyMessage";
import authAxios from "@/domains/common/lib/axios/authAxios";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

interface Props {
  userId: string;
  isMe: boolean;
}

const PlaylistList = ({ userId, isMe }: Props) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const myUserId = userSpotifyStore.getState().userId;

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        let res;
        if (isMe) {
          res = await authAxios.get("/api/playlist/getPlaylist");
        } else {
          res = await appAxios.get(`/api/users/${userId}/playlists`);
        }
        const onlyMy = (res.data as Playlist[]).filter(
          (pl) => pl.owner?.id === myUserId
        );
        setPlaylists(onlyMy);
      } catch {
        setPlaylists([]);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, [userId, isMe, myUserId]);

  const handleGoDetail = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  const getTrackCount = (playlist: Playlist) => {
    if ("trackCount" in playlist && typeof playlist.trackCount === "number") {
      return playlist.trackCount;
    }
    if ("tracks" in playlist && typeof playlist.tracks?.total === "number") {
      return playlist.tracks.total;
    }
    return 0;
  };

  const getIsPublic = (playlist: Playlist) => {
    if ("isPublic" in playlist) return !!playlist.isPublic;
    if ("public" in playlist) return !!playlist.public;
    return false;
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col gap-2 md:gap-2 mt-6">
      {playlists.length === 0 ? (
        <EmptyMessage message="플레이리스트가 없습니다." />
      ) : (
        playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center bg-white rounded-xl p-2 md:p-4 shadow border gap-2 md:gap-4 cursor-pointer transition hover:bg-blue-50"
            onClick={() => handleGoDetail(playlist.id)}
          >
            <Image
              src={
                playlist.images && playlist.images[0]?.url
                  ? playlist.images[0].url
                  : "/goorm_logo_blue.png"
              }
              alt={playlist.name}
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
              width={64}
              height={64}
            />

            <div className="flex-1 basis-0 min-w-0 max-w-full">
              <div className="font-bold text-sm md:text-base mb-1 truncate">
                {playlist.name}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mb-1 truncate">
                {playlist.description}
              </div>
              <div className="text-xs md:text-sm text-gray-400 truncate">
                {getTrackCount(playlist)}곡
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs md:text-sm ${
                    getIsPublic(playlist)
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {getIsPublic(playlist) ? "공개" : "비공개"}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlaylistList;
