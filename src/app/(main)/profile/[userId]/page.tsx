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

  // 프로필/플레이리스트/좋아요/팔로우 데이터 fetch
  useEffect(() => {
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
          profileImageUrl: null, // 필요 시 데이터 구조 맞게
          bio: "", // bio는 별도 관리 필요
          followerCount: 0, // 별도 구현 필요
          followingCount: 0, // 별도 구현 필요
          playlistCount: 0, // 별도 구현 필요
          likedTrackCount: 0, // 별도 구현 필요
          followingPlaylistCount: 0, // 별도 구현 필요
          genres: [], // 별도 구현 필요
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
        // 만약 없으면 이 부분 생략
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

    fetchAll();
  }, []);

  const handleEdit = () => alert("프로필 편집 모달!");

  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4 pt-10 pb-8">
          <ProfileHeader profile={profile} onEdit={handleEdit} />
          <div className="mt-6">
            <GenreTags
              genres={profile.genres}
              onEdit={() => alert("장르 편집 모달!")}
            />
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <ProfileTabMenu tab={tab} onTabChange={setTab} />
        {tab === "playlists" && <PlaylistList playlists={myPlaylists} />}
        {tab === "liked" && <LikedTrackList tracks={likedSongs} />}
        {tab === "following" && (
          <FollowingPlaylist playlists={followedPlaylists} />
        )}
      </div>
    </div>
  );
}
