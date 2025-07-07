"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";
import PlaylistList from "@/domains/profile/components/PlaylistList";
import LikedTrackList from "@/domains/profile/components/LikedTrackList";
import FollowingPlaylist from "@/domains/profile/components/FollowingPlaylist";
import { Profile } from "@/domains/profile/types/Profile";
import { Playlist } from "@/domains/profile/types/Playlist";
import { Track, SpotifyLikedTrack } from "@/domains/profile/types/Track";

export default function ProfilePage() {
  // 탭 관리
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );

  // 실제 데이터 상태
  const [profile, setProfile] = useState<Profile | null>(null);
  const [myPlaylists, setMyPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [followedPlaylists, setFollowedPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  // 장르 편집 모달 상태
  const [editGenresOpen, setEditGenresOpen] = useState(false);
  const [editGenres, setEditGenres] = useState<string[]>([]);

  // 장르 편집 모달 열기
  const handleEditGenres = () => {
    if (!profile) return;
    setEditGenres(profile.genres || []);
    setEditGenresOpen(true);
  };

  // 장르 저장
  const handleSaveGenres = () => {
    setProfile((p) => (p ? { ...p, genres: editGenres } : p));
    setEditGenresOpen(false);
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
        profileImageUrl: null,
        bio: "",
        followerCount: 0,
        followingCount: 0,
        playlistCount: 0,
        likedTrackCount: 0,
        followingPlaylistCount: 0,
        genres: [],
        isMe: true,
        isFollowing: false,
      });

      // 내 플레이리스트
      const resPlaylists = await fetch("/api/playlist/getPlaylist");
      const playlistsData = await resPlaylists.json();
      setMyPlaylists(playlistsData);

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

      // 팔로우 플레이리스트 (존재 시)
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

  // 아래 3개는 기존과 동일하게 유지
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
      const res = await fetch("/api/playlist/deletePlaylist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: playlistId }),
      });
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
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4 pt-10 pb-8">
          <ProfileHeader profile={profile} />
          <div className="mt-6">
            <GenreTags genres={profile.genres} onEdit={handleEditGenres} />
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <ProfileTabMenu tab={tab} onTabChange={setTab} />
        {tab === "playlists" && (
          <PlaylistList
            playlists={myPlaylists}
            onEdit={handleEditPlaylist}
            onDelete={handleDeletePlaylist}
            onTogglePublic={handleTogglePublic}
          />
        )}
        {tab === "liked" && <LikedTrackList tracks={likedSongs} />}
        {tab === "following" && (
          <FollowingPlaylist playlists={followedPlaylists} />
        )}
      </div>

      {/* === 장르 편집 모달 === */}
      {editGenresOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-[320px] flex flex-col gap-3">
            <div className="font-bold text-lg mb-2">선호 장르 편집</div>
            <input
              className="border p-2 rounded mb-2"
              placeholder="장르를 쉼표로 구분해 입력 (예: K-Pop, Jazz)"
              value={editGenres.join(", ")}
              onChange={(e) =>
                setEditGenres(
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-blue-500 text-white rounded px-3 py-2"
                onClick={handleSaveGenres}
              >
                저장
              </button>
              <button
                className="flex-1 bg-gray-200 rounded px-3 py-2"
                onClick={() => setEditGenresOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
