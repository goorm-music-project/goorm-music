"use client";
import { useEffect } from "react";
import { useProfileStore } from "@/domains/profile/stores/useProfileStore";
import ProfileHeader from "@/domains/profile/components/ProfileHeader";
import GenreTags from "@/domains/profile/components/GenreTags";
import ProfileTabMenu from "@/domains/profile/components/ProfileTabMenu";

// 임시 더미 API 함수 import
import { getProfile } from "@/domains/profile/api/getProfile";
import { getProfilePlaylists } from "@/domains/profile/api/getProfilePlaylists";
import { getProfileLikedTracks } from "@/domains/profile/api/getProfileLikedTracks";
import { getProfileFollowingPlaylist } from "@/domains/profile/api/getProfileFollowingPlaylist";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { setProfile, setPlaylists, setLikedTracks, setFollowingPlaylists } =
    useProfileStore();

  useEffect(() => {
    async function fetchAll() {
      const [profile, playlists, likedTracks, followingPlaylists] =
        await Promise.all([
          getProfile(params.userId),
          getProfilePlaylists(params.userId),
          getProfileLikedTracks(params.userId),
          getProfileFollowingPlaylist(params.userId),
        ]);
      setProfile(profile);
      setPlaylists(playlists);
      setLikedTracks(likedTracks);
      setFollowingPlaylists(followingPlaylists);
    }
    fetchAll();
  }, [params.userId]);

  return (
    <div className="max-w-3xl mx-auto">
      <ProfileHeader />
      <GenreTags />
      <ProfileTabMenu />
    </div>
  );
}
