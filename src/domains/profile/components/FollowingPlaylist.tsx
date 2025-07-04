// src/domains/profile/components/FollowingPlaylist.tsx

import { Playlist } from "../types/Playlist";

interface FollowingPlaylistProps {
  playlists: Playlist[];
}

export default function FollowingPlaylist({
  playlists,
}: FollowingPlaylistProps) {
  if (playlists.length === 0) {
    return (
      <div className="text-gray-500 py-8 text-center">
        팔로우한 플레이리스트가 없습니다.
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
              <div className="text-xs text-gray-500 mt-1">
                by {playlist.ownerNickname}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
