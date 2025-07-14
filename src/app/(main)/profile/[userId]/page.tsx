"use client";

import { useEffect, useState, useCallback } from "react";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import PlaylistList from "@/domains/profile/components/PlaylistList";
import LikedTrackList from "@/domains/profile/components/LikedTrackList";
import FollowingPlaylist from "@/domains/profile/components/FollowingPlaylist";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";
import {
  Track,
  Profile,
  Playlist,
  SpotifyLikedTrack,
} from "@/domains/profile/types/Profile";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useParams, useRouter } from "next/navigation";
import authAxios from "@/domains/common/lib/axios/authAxios";
import appAxios from "@/domains/common/lib/axios/appAxios";

export default function ProfilePage() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const myUserId = userSpotifyStore((state) => state.userId);
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? params.userId[0]
    : params?.userId;

  const isMe = !!profile && myUserId === profile.id;

  const fetchAll = useCallback(async () => {
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
        const resProfile = await authAxios.post("/api/userData");
        profileData = resProfile.data;
      } else {
        const resProfile = await appAxios.get(`/api/users/${userId}`);
        profileData = resProfile.data;
      }

      setProfile({
        id: profileData.userId,
        nickname: profileData.display_name || profileData.nickname || "",
        username: profileData.userId,
        imageUrl: profileData.imageUrl ?? null,
        genres: profileData.genres || [],
        isMe: myUserId === profileData.userId,
      });

      let playlistsData: Playlist[];
      if (myUserId && userId === myUserId) {
        const resPlaylists = await authAxios.get("/api/playlist/getPlaylist");
        playlistsData = resPlaylists.data;
      } else {
        const resPlaylists = await appAxios.get(
          `/api/users/${userId}/playlists`
        );
        playlistsData = resPlaylists.data;
      }
      setAllPlaylists(playlistsData);
      if (myUserId && userId === myUserId) {
        const resLiked = await authAxios.get("/api/likeList");
        const likedData = resLiked.data as SpotifyLikedTrack[];
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
        setLikedSongs([]);
      }
    } catch {
      alert("데이터 로드에 실패했습니다.");
    }
    setLoading(false);
  }, [myUserId, userId]);

  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    fetchAll();
  }, [isLoggedIn, userId, fetchAll]);

  const handleCopyProfileLink = useCallback(() => {
    if (!profile) return;
    const profileUrl = `${window.location.origin}/profile/${profile.id}`;
    navigator.clipboard.writeText(profileUrl);
    alert("프로필 링크가 복사되었습니다!");
  }, [profile]);

  const handleUnfollowPlaylist = async (playlistId: string): Promise<void> => {
    if (!confirm("정말 삭제(언팔로우) 하시겠습니까?")) return;
    try {
      await authAxios.delete(`/api/playlist/unfollow`, {
        data: { playlistId },
      });
      setAllPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleUnlikeTrack = async (trackId: string): Promise<void> => {
    try {
      await authAxios.delete("/api/likeList", {
        data: { trackId },
      });
      setLikedSongs((prev) => prev.filter((t) => t.id !== trackId));
    } catch {
      alert("좋아요 취소 실패");
    }
  };

  const publicPlaylistsCount = allPlaylists.filter((pl) => pl.public).length;

  const myPlaylists = allPlaylists
    .filter(
      (pl) =>
        pl.owner?.id === profile?.id &&
        (isMe || pl.isPublic === undefined || pl.isPublic === true)
    )
    .map((pl) => ({
      ...pl,
      coverImageUrl: pl.images?.[0]?.url || null,
    }));

  const followedPlaylists = isMe
    ? allPlaylists
        .filter((pl) => pl.owner?.id !== profile?.id)
        .map((pl) => ({
          ...pl,
          coverImageUrl: pl.images?.[0]?.url || null,
        }))
    : [];

  if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;
  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  const handleLogout = async () => {
    try {
      await authAxios.post("/api/logout");
      userSpotifyStore.setState({ isLoggedIn: false, userId: "" });
      router.push("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pb-24 min-h-full overflow-y-auto">
      <div className="bg-[var(--background)]">
        <div className="px-4 pb-8">
          <div className="flex flex-col md:flex-between md:flex-row">
            <ProfileHeader
              profile={profile}
              showSensitiveInfo={isMe}
              isMe={isMe}
              publicPlaylistsCount={!isMe ? publicPlaylistsCount : undefined}
              onCopyProfileLink={!isMe ? handleCopyProfileLink : undefined}
            />
            <div className="flex px-4 pt-4">
              <button
                className="bg-[#FF6C78] text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 transition w-25 h-10"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
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
        <ProfileTabMenu
          tab={tab}
          onTabChange={setTab}
          tabs={isMe ? ["playlists", "liked", "following"] : ["playlists"]}
        />
        {tab === "playlists" && (
          <PlaylistList playlists={myPlaylists} isMe={isMe} />
        )}
        {tab === "liked" && isMe && (
          <LikedTrackList tracks={likedSongs} onUnlike={handleUnlikeTrack} />
        )}
        {tab === "following" && isMe && (
          <FollowingPlaylist
            playlists={followedPlaylists}
            onUnfollow={handleUnfollowPlaylist}
          />
        )}
      </div>
    </div>
  );
}
