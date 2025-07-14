import Image from "next/image";
import { Track } from "../types/Profile";

interface Props {
  tracks: Track[];
  onUnlike: (trackId: string) => void;
}

const LikedTrackList = ({ tracks, onUnlike }: Props) => (
  <div>
    {tracks.length === 0 ? (
      <div className="text-center text-gray-400 py-12">
        좋아요한 곡이 없습니다.
      </div>
    ) : (
      tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-3 py-2 border-b last:border-b-0"
        >
          <Image
            src={track.albumCoverUrl || "/default-cover.png"}
            className="w-12 h-12 rounded"
            alt={track.title}
          />
          <div>
            <div className="font-bold">{track.title}</div>
            <div className="text-xs text-gray-500">{track.artist}</div>
          </div>
          <span className="ml-auto text-xs text-gray-400">
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
