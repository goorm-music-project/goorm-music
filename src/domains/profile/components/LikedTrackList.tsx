import { useEffect, useState } from "react";
import Image from "next/image";
import { Track, SpotifyLikedTrack } from "../types/Profile";
import EmptyMessage from "./EmptyMessage";
import Link from "next/link";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import authAxios from "@/domains/common/lib/axios/authAxios";

interface Props {
  isMe: boolean;
}

const LikedTrackList = ({ isMe }: Props) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMe) {
      setTracks([]);
      setLoading(false);
      return;
    }
    const fetchLikedTracks = async () => {
      setLoading(true);
      try {
        const res = await authAxios.get("/api/likeList");
        const likedData = res.data as SpotifyLikedTrack[];
        const likedTracks: Track[] = likedData.map((item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a) => a.name).join(", "),
          albumCoverUrl: item.track.album?.images?.[0]?.url || null,
          duration: Math.floor(item.track.duration_ms / 1000),
          isLiked: true,
        }));
        setTracks(likedTracks);
      } catch {
        setTracks([]);
      }
      setLoading(false);
    };
    fetchLikedTracks();
  }, [isMe]);

  const handleUnlike = async (trackId: string) => {
    try {
      await authAxios.delete("/api/likeList", { data: { trackId } });
      setTracks((prev) => prev.filter((t) => t.id !== trackId));
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  if (!isMe) return null;
  if (loading) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col gap-2 md:gap-6 mt-6">
      {tracks.length === 0 ? (
        <EmptyMessage message="좋아요한 곡이 없습니다." />
      ) : (
        tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-4 md:gap-6 py-3 md:py-2 border-b last:border-b-0"
            onClick={() =>
              usePlayerStore.setState({ selectedTrackId: track.id })
            }
          >
            <Link
              href={`/track/${track.id}`}
              className="flex items-center flex-1 gap-4 cursor-pointer hover:bg-gray-50 rounded"
            >
              <Image
                src={track.albumCoverUrl || "/default-cover.png"}
                className="w-12 h-12 md:w-16 md:h-16 rounded"
                alt={track.title}
                width={48}
                height={48}
              />
              <div>
                <div className="font-bold text-sm md:text-base">
                  {track.title}
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  {track.artist}
                </div>
              </div>
            </Link>
            <span className="ml-auto text-xs md:text-sm text-gray-400">
              {Math.floor(track.duration / 60)}:
              {(track.duration % 60).toString().padStart(2, "0")}
            </span>
            {track.isLiked && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnlike(track.id);
                }}
                className="ml-2 text-pink-500 text-lg focus:outline-none"
                aria-label="좋아요 취소"
              >
                ♥
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LikedTrackList;
