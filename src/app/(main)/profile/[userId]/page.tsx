"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";
import PlaylistList from "@/domains/profile/components/PlaylistList";
import LikedTrackList from "@/domains/profile/components/LikedTrackList";
import FollowingPlaylist from "@/domains/profile/components/FollowingPlaylist";
import {
  Track,
  SpotifyLikedTrack,
  Profile,
  Playlist,
} from "@/domains/profile/types/Profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );
  const [loading, setLoading] = useState(true);

  const handleUnlikeTrack = async (trackId: string) => {
    try {
      await fetch("/api/likeList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId }),
      });
      setLikedSongs((prev) => prev.filter((t) => t.id !== trackId));
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  async function fetchAll() {
    setLoading(true);
    try {
      const resProfile = await fetch("/api/userData", { method: "POST" });
      const profileData = await resProfile.json();
      setProfile({
        id: profileData.userId,
        nickname: profileData.display_name,
        username: profileData.userId,
        imageUrl: profileData.imageUrl ?? null,
        genres: profileData.genres || [],
        isMe: true,
      });

      const resPlaylists = await fetch("/api/playlist/getPlaylist");
      const playlistsData: Playlist[] = await resPlaylists.json();
      setAllPlaylists(playlistsData);

      const resLiked = await fetch("/api/likeList");
      if (!resLiked.ok) throw new Error("likeList fetch failed");
      const likedData = await resLiked.json();
      const likedTracks: Track[] = (likedData as SpotifyLikedTrack[]).map(
        (item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists
            .map((a: { name: string }) => a.name)
            .join(", "),
          albumCoverUrl: item.track.album?.images?.[0]?.url || null,
          duration: Math.floor(item.track.duration_ms / 1000),
          isLiked: true,
        })
      );
      setLikedSongs(likedTracks);
    } catch {
      alert("데이터 로드에 실패했습니다.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  const myPlaylists = allPlaylists.filter((pl) => pl.owner?.id === profile.id);
  const followedPlaylists = allPlaylists.filter(
    (pl) => pl.owner?.id !== profile.id
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 pb-8">
          <ProfileHeader profile={profile} />
          <div className="mt-4">
            <GenreTags
              userId={profile.id}
              genres={profile.genres}
              onSave={(newGenres: string[]) =>
                setProfile((prev) =>
                  prev ? { ...prev, genres: newGenres } : prev
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="px-4">
        <ProfileTabMenu tab={tab} onTabChange={setTab} />
        {tab === "playlists" && (
          <PlaylistList
            playlists={myPlaylists}
            onEdit={() => {}}
            onDelete={() => {}}
            onTogglePublic={() => {}}
          />
        )}
        {tab === "liked" && (
          <LikedTrackList tracks={likedSongs} onUnlike={handleUnlikeTrack} />
        )}
        {tab === "following" && (
          <FollowingPlaylist playlists={followedPlaylists} />
        )}
      </div>
    </div>
  );
}
