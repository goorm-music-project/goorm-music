// src/domains/profile/components/PlaylistList.tsx

import { Playlist } from "../types/Playlist";

interface PlaylistListProps {
  playlists: Playlist[];
}

export default function PlaylistList({ playlists }: PlaylistListProps) {
  if (playlists.length === 0) {
    return (
      <div className="text-gray-500 py-8 text-center">
        플레이리스트가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex items-center bg-white rounded-xl shadow px-4 py-3 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center">
              {playlist.coverImageUrl ? (
                <img
                  src={playlist.coverImageUrl}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-2xl">🎵</span>
              )}
            </div>
            <div>
              <div className="font-semibold">{playlist.name}</div>
              <div className="text-gray-500 text-sm">
                {playlist.description}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {playlist.trackCount}곡
              </div>
            </div>
          </div>
          <div>
            {playlist.isPublic ? (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                공개
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded-full">
                비공개
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
