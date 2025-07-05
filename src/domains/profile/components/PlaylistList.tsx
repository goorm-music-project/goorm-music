"use client";
import { useProfileStore } from "../stores/useProfileStore";

export default function PlaylistList() {
  const playlists = useProfileStore((s) => s.playlists);

  if (!playlists || playlists.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        플레이리스트가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex items-center p-4 border rounded-lg hover:shadow-md bg-white"
        >
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
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
          <div className="flex-1">
            <div className="font-semibold">{playlist.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {playlist.description}
            </div>
          </div>
          <div className="text-xs text-gray-400 ml-4">
            {playlist.trackCount}곡
          </div>
        </div>
      ))}
    </div>
  );
}
