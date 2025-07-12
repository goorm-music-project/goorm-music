"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import PlaylistList from "@/domains/profile/components/PlaylistList";
import LikedTrackList from "@/domains/profile/components/LikedTrackList";
import FollowingPlaylist from "@/domains/profile/components/FollowingPlaylist";
import {
  Track,
  Profile,
  Playlist,
  SpotifyLikedTrack,
} from "@/domains/profile/types/Profile";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useParams } from "next/navigation";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";

export default function ProfilePage() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const myUserId = userSpotifyStore((state) => state.userId);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );
  const [loading, setLoading] = useState(true);

  // 라우트 파라미터에서 userId 가져오기
  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? params?.userId[0]
    : params?.userId;

  // 내 프로필 여부 판단
  const isMe = myUserId !== null && profile?.id === myUserId;

  // 플레이리스트 언팔로우 핸들러
  const handleUnfollowPlaylist = async (playlistId: string): Promise<void> => {
    if (!confirm("정말 삭제(언팔로우) 하시겠습니까?")) return;
    try {
      await fetch(`/api/playlist/unfollow`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
        credentials: "include",
      });
      setAllPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  // 좋아요 취소 핸들러
  const handleUnlikeTrack = async (trackId: string): Promise<void> => {
    try {
      await fetch("/api/likeList", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId }),
        credentials: "include",
      });
      setLikedSongs((prev) => prev.filter((t) => t.id !== trackId));
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  // 데이터 패칭 함수
  async function fetchAll(): Promise<void> {
    setLoading(true);
    try {
      let profileData: {
        userId: string;
        display_name?: string;
        nickname?: string;
        imageUrl?: string | null;
        genres?: string[];
      };

      if (myUserId && userId === myUserId) {
        const resProfile = await fetch("/api/userData", {
          method: "POST",
          credentials: "include",
        });
        profileData = await resProfile.json();
      } else {
        const resProfile = await fetch(`/api/users/${userId}`);
        profileData = await resProfile.json();
      }

      setProfile({
        id: profileData.userId,
        nickname: profileData.display_name || profileData.nickname || "",
        username: profileData.userId,
        imageUrl: profileData.imageUrl ?? null,
        genres: profileData.genres || [],
        isMe: myUserId === profileData.userId,
      });

      // 플레이리스트 불러오기
      const resPlaylists = await fetch("/api/playlist/getPlaylist", {
        credentials: "include",
      });
      const playlistsData: Playlist[] = await resPlaylists.json();
      setAllPlaylists(playlistsData);

      // 좋아요 리스트는 내 프로필일 때만 불러오기
      if (myUserId && userId === myUserId) {
        const resLiked = await fetch("/api/likeList", {
          credentials: "include",
        });
        if (!resLiked.ok) throw new Error("likeList fetch failed");
        const likedData = (await resLiked.json()) as SpotifyLikedTrack[];
        const likedTracks: Track[] = likedData.map((item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a) => a.name).join(", "),
          albumCoverUrl: item.track.album?.images?.[0]?.url || null,
          duration: Math.floor(item.track.duration_ms / 1000),
          isLiked: true,
        }));
        setLikedSongs(likedTracks);
      } else {
        setLikedSongs([]); // 타인 프로필에서는 좋아요 리스트 비움
      }
    } catch {
      alert("데이터 로드에 실패했습니다.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userId]);

  if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;
  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  // 공개 여부 필터링 및 커버 이미지 처리
  const myPlaylists = allPlaylists
    .filter(
      (pl) =>
        pl.owner?.id === profile.id &&
        (isMe || pl.isPublic === undefined || pl.isPublic === true)
    )
    .map((pl) => ({
      ...pl,
      coverImageUrl: pl.images?.[0]?.url || null,
    }));

  // 팔로우 플레이리스트(내 프로필일 때만)
  const followedPlaylists = isMe
    ? allPlaylists
        .filter((pl) => pl.owner?.id !== profile.id)
        .map((pl) => ({
          ...pl,
          coverImageUrl: pl.images?.[0]?.url || null,
        }))
    : [];

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pb-24 min-h-full overflow-y-auto">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 pb-8">
          <ProfileHeader profile={profile} showSensitiveInfo={isMe} />
          <div className="mt-4">
            <GenreTags
              userId={profile.id}
              genres={profile.genres}
              onSave={(newGenres: string[]) =>
                setProfile((prev) =>
                  prev ? { ...prev, genres: newGenres } : prev
                )
              }
              showEditButton={isMe}
            />
          </div>
        </div>
      </div>
      <div className="px-4">
        <ProfileTabMenu tab={tab} onTabChange={setTab} />
        {tab === "playlists" && (
          <PlaylistList playlists={myPlaylists} isMe={isMe} />
        )}
        {isMe && tab === "liked" && (
          <LikedTrackList tracks={likedSongs} onUnlike={handleUnlikeTrack} />
        )}
        {isMe && tab === "following" && (
          <FollowingPlaylist
            playlists={followedPlaylists}
            onUnfollow={handleUnfollowPlaylist}
          />
        )}
      </div>
    </div>
  );
}
