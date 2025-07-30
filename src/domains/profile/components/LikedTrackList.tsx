import Image from "next/image";
import { Track } from "../types/Profile";
import EmptyMessage from "./EmptyMessage";
import Link from "next/link";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";

interface Props {
  tracks: Track[];
  onUnlike: (trackId: string) => void;
}

const LikedTrackList = ({ tracks, onUnlike }: Props) => (
  <div className="flex flex-col gap-2 md:gap-6 mt-6">
    {tracks.length === 0 ? (
      <EmptyMessage message="좋아요한 곡이 없습니다." />
    ) : (
      tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-4 md:gap-6 py-3 md:py-2 border-b last:border-b-0"
          onClick={() => usePlayerStore.setState({ selectedTrackId: track.id })}
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
              onClick={() => onUnlike(track.id)}
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

export default LikedTrackList;
