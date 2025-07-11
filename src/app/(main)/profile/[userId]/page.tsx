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
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

export default function ProfilePage() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );
  const [loading, setLoading] = useState(true);

  const handleUnfollowPlaylist = async (playlistId: string) => {
    if (!confirm("정말 삭제(언팔로우) 하시겠습니까?")) return;
    try {
      await fetch(`/api/playlist/unfollow`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
        credentials: "include", // 쿠키 포함
      });
      setAllPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  // 좋아요 취소
  const handleUnlikeTrack = async (trackId: string) => {
    try {
      await fetch("/api/likeList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId }),
        credentials: "include", // 쿠키 포함 필수
      });
      setLikedSongs((prev) => prev.filter((t) => t.id !== trackId));
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  async function fetchAll() {
    setLoading(true);
    try {
      const resProfile = await fetch("/api/userData", {
        method: "POST",
        credentials: "include", // 쿠키 포함
      });
      const profileData = await resProfile.json();
      setProfile({
        id: profileData.userId,
        nickname: profileData.display_name,
        username: profileData.userId,
        imageUrl: profileData.imageUrl ?? null,
        genres: profileData.genres || [],
        isMe: true,
      });

      const resPlaylists = await fetch("/api/playlist/getPlaylist", {
        credentials: "include",
      });
      const playlistsData: Playlist[] = await resPlaylists.json();
      setAllPlaylists(playlistsData);

      const resLiked = await fetch("/api/likeList", {
        credentials: "include",
      });
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
    if (!isLoggedIn) return;
    fetchAll();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;
  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  // 내 플레이리스트와 팔로우 플레이리스트 구분
  const myPlaylists = allPlaylists
    .filter((pl) => pl.owner?.id === profile.id)
    .map((pl) => ({
      ...pl,
      coverImageUrl: pl.images?.[0]?.url || null,
    }));

  const followedPlaylists = allPlaylists
    .filter((pl) => pl.owner?.id !== profile.id)
    .map((pl) => ({
      ...pl,
      coverImageUrl: pl.images?.[0]?.url || null,
    }));

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
        {tab === "playlists" && <PlaylistList playlists={myPlaylists} />}
        {tab === "liked" && (
          <LikedTrackList tracks={likedSongs} onUnlike={handleUnlikeTrack} />
        )}
        {tab === "following" && (
          <FollowingPlaylist
            playlists={followedPlaylists}
            onUnfollow={handleUnfollowPlaylist}
          />
        )}
      </div>
    </div>
  );
}
