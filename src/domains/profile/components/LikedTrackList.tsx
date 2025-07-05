"use client";
import { useProfileStore } from "../stores/useProfileStore";

export default function LikedTrackList() {
  const likedTracks = useProfileStore((s) => s.likedTracks);

  if (!likedTracks || likedTracks.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        좋아요한 곡이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {likedTracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center p-3 rounded-lg hover:bg-gray-50"
        >
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
            {track.coverImageUrl ? (
              <img
                src={track.coverImageUrl}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xl">🎶</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{track.title}</div>
            <div className="text-xs text-gray-500 truncate">{track.artist}</div>
          </div>
          <div className="ml-4 text-xs text-gray-400">{track.duration}</div>
        </div>
      ))}
    </div>
  );
}
