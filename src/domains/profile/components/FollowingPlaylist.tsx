import { useEffect, useState } from "react";
import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";
import EmptyMessage from "./EmptyMessage";
import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

interface Props {
  isMe: boolean;
}

const FollowingPlaylist = ({ isMe }: Props) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isMe) {
      setPlaylists([]);
      setLoading(false);
      return;
    }
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const res = await authAxios.get("/api/playlist/getPlaylist");
        const all = res.data as Playlist[];
        const myUserId = userSpotifyStore.getState().userId;
        const followed = all
          .filter((pl) => pl.owner?.id !== myUserId)
          .map((pl) => ({
            ...pl,
            coverImageUrl: pl.images?.[0]?.url || null,
          }));
        setPlaylists(followed);
      } catch {
        setPlaylists([]);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, [isMe]);

  const handleUnfollow = async (playlistId: string) => {
    if (!confirm("정말 삭제(언팔로우) 하시겠습니까?")) return;
    try {
      await authAxios.delete(`/api/playlist/unfollow`, {
        data: { playlistId },
      });
      setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  if (!isMe) return null;
  if (loading) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col gap-2 md:gap-2 mt-6">
      {playlists.length === 0 ? (
        <EmptyMessage message="팔로우한 플레이리스트가 없습니다." />
      ) : (
        playlists.map((pl) => (
          <div
            key={pl.id}
            className="flex items-center bg-white rounded-xl p-2 md:p-4 shadow border gap-2 md:gap-4 cursor-pointer transition hover:bg-blue-50"
            onClick={() => router.push(`/playlist/${pl.id}`)}
          >
            {pl.coverImageUrl ? (
              <Image
                src={pl.coverImageUrl}
                alt={pl.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                width={64}
                height={64}
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-200 flex-shrink-0" />
            )}
            <div className="flex-1 basis-0 min-w-0 max-w-full">
              <div className="font-bold text-sm md:text-base mb-1 truncate">
                {pl.name}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnfollow(pl.id);
              }}
              className="ml-2 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
              aria-label="언팔로우"
            >
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowingPlaylist;
