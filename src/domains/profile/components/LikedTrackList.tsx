// src/domains/profile/components/LikedTrackList.tsx

import { Track } from "../types/Track";

interface LikedTrackListProps {
  tracks: Track[];
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function LikedTrackList({ tracks }: LikedTrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-gray-500 py-8 text-center">
        좋아요한 곡이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className="flex items-center border-b py-2 px-2 hover:bg-gray-50"
          >
            <div className="w-8 text-center text-gray-400">{i + 1}</div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mx-2">
              {track.albumCoverUrl ? (
                <img
                  src={track.albumCoverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl text-gray-400">🎵</span>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{track.title}</div>
              <div className="text-gray-500 text-xs">{track.artist}</div>
            </div>
            <div className="text-gray-500 text-xs w-12 text-right">
              {formatTime(track.duration)}
            </div>
            <div className="pl-2 text-red-400 text-lg">♥</div>
          </div>
        ))}
      </div>
    </div>
  );
}
