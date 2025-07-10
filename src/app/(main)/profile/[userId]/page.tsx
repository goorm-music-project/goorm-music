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
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );
  const [profile, setProfile] = useState<Profile | null>(null);
  const [myPlaylists, setMyPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [followedPlaylists, setFollowedPlaylists] = useState<Playlist[]>([]);
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
      // 프로필 정보
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

      // 내 플레이리스트
      const resPlaylists = await fetch("/api/playlist/getPlaylist");
      const playlistsData: Playlist[] = await resPlaylists.json();
      setMyPlaylists(
        (playlistsData ?? []).filter(Boolean).map((p) => ({
          ...p,
          isPublic: p.public,
          images: Array.isArray(p.images) && p.images[0] ? p.images : [],
        }))
      );

      // 좋아요 트랙
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

      // 팔로우 플레이리스트
      const resFollowed = await fetch("/api/followingPlaylist");
      if (resFollowed.ok) {
        const followedData = await resFollowed.json();
        setFollowedPlaylists(followedData);
      }
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

  // 플레이리스트 관련 핸들러
  const handleEditPlaylist = async (
    playlistId: string,
    newName: string,
    newDesc: string
  ) => {
    try {
      const res = await fetch("/api/playlist/editPlaylistDetail", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: playlistId,
          name: newName,
          description: newDesc,
        }),
      });
      if (!res.ok) throw new Error("수정 실패");
      await fetchAll();
    } catch {
      alert("플레이리스트 수정에 실패했습니다.");
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm("정말 삭제할까요?")) return;
    try {
      const res = await fetch(
        `/api/playlist/deletePlaylist?playlistId=${playlistId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("삭제 실패");
      await fetchAll();
    } catch {
      alert("플레이리스트 삭제에 실패했습니다.");
    }
  };

  const handleTogglePublic = async (
    playlistId: string,
    newIsPublic: boolean
  ) => {
    try {
      const res = await fetch("/api/playlist/editPlaylistDetail", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: playlistId,
          isPublic: newIsPublic,
        }),
      });
      if (!res.ok) throw new Error("공개/비공개 변경 실패");
      await fetchAll();
    } catch {
      alert("공개/비공개 전환에 실패했습니다.");
    }
  };

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
            onEdit={handleEditPlaylist}
            onDelete={handleDeletePlaylist}
            onTogglePublic={handleTogglePublic}
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
