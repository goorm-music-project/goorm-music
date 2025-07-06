"use client";
import { useState } from "react";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";
import PlaylistList from "@/domains/profile/components/PlaylistList";
import LikedTrackList from "@/domains/profile/components/LikedTrackList";
import FollowingPlaylist from "@/domains/profile/components/FollowingPlaylist";
import { Profile } from "@/domains/profile/types/Profile";
import { Playlist } from "@/domains/profile/types/Playlist";
import { Track } from "@/domains/profile/types/Track";

const user: Profile = {
  id: "1",
  nickname: "김뮤직",
  username: "musiclover2024",
  profileImageUrl: null,
  bio: "음악을 사랑하는 사람입니다. 다양한 장르의 음악을 즐겨 듣고 플레이리스트를 만드는 것을 좋아해요! 🎵",
  followerCount: 1234,
  followingCount: 567,
  playlistCount: 2,
  likedTrackCount: 3,
  followingPlaylistCount: 2,
  genres: ["K-Pop", "Hip Hop", "R&B", "Pop", "Jazz", "Electronic"],
  isMe: true,
  isFollowing: false,
};

const myPlaylists: Playlist[] = [
  {
    id: "1",
    name: "내가 좋아하는 K-Pop",
    description: "최신 K-Pop 히트곡들을 모아놨어요",
    coverImageUrl: null,
    trackCount: 25,
    isPublic: true,
    ownerId: "1",
    ownerNickname: "김뮤직",
  },
  {
    id: "2",
    name: "밤에 듣기 좋은 음악",
    description: "조용한 밤에 어울리는 감성적인 곡들",
    coverImageUrl: null,
    trackCount: 18,
    isPublic: true,
    ownerId: "1",
    ownerNickname: "김뮤직",
  },
];

const likedSongs: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200,
    albumCoverUrl: null,
    isLiked: true,
  },
  {
    id: "2",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    duration: 141,
    albumCoverUrl: null,
    isLiked: true,
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    duration: 178,
    albumCoverUrl: null,
    isLiked: true,
  },
];

const followedPlaylists: Playlist[] = [
  {
    id: "3",
    name: "팔로우 플레이리스트 이름",
    description: "설명",
    coverImageUrl: null,
    trackCount: 9,
    isPublic: true,
    ownerId: "2",
    ownerNickname: "다른유저",
  },
  {
    id: "4",
    name: "또 다른 팔로우",
    description: "설명2",
    coverImageUrl: null,
    trackCount: 7,
    isPublic: true,
    ownerId: "3",
    ownerNickname: "또다른유저",
  },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );

  const handleEdit = () => alert("프로필 편집 모달!");

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4 pt-10 pb-8">
          <ProfileHeader profile={user} onEdit={handleEdit} />
          <div className="mt-6">
            <GenreTags
              genres={user.genres}
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
