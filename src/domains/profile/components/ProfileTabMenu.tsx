"use client";
import { useProfileStore } from "../stores/useProfileStore";
import PlaylistList from "./PlaylistList";
import LikedTrackList from "./LikedTrackList";
import FollowingPlaylist from "./FollowingPlaylist";

export default function ProfileTabMenu() {
  const tab = useProfileStore((s) => s.tab);
  const setTab = useProfileStore((s) => s.setTab);

  return (
    <div>
      <div className="grid w-full grid-cols-3 bg-gray-100 rounded-lg mb-6 overflow-hidden">
        <button
          onClick={() => setTab("playlists")}
          className={`py-2 text-sm font-semibold ${
            tab === "playlists"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          플레이리스트
        </button>
        <button
          onClick={() => setTab("liked")}
          className={`py-2 text-sm font-semibold ${
            tab === "liked"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          좋아요
        </button>
        <button
          onClick={() => setTab("following")}
          className={`py-2 text-sm font-semibold ${
            tab === "following"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          팔로우
        </button>
      </div>

      {tab === "playlists" && <PlaylistList />}
      {tab === "liked" && <LikedTrackList />}
      {tab === "following" && <FollowingPlaylist />}
    </div>
  );
}
