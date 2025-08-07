import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import GenreTags from "./GenreTags";
import authAxios from "@/domains/common/lib/axios/authAxios";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { Profile, RawProfileData } from "@/domains/profile/types/Profile";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useRouter } from "next/navigation";

interface ProfileHeaderAreaProps {
  userId: string;
  isMe: boolean;
}

export default function ProfileHeaderArea({
  userId,
  isMe,
}: ProfileHeaderAreaProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const setIsLoggedIn = userSpotifyStore((state) => state.setIsLoggedIn);
  const setUserId = userSpotifyStore((state) => state.setUserId);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let res;
        if (isMe) {
          res = await authAxios.post("/api/userData");
        } else {
          res = await appAxios.get(`/api/users/${userId}`);
        }
        const profileData: RawProfileData = res.data;
        setProfile({
          id: profileData.userId,
          nickname: profileData.display_name || profileData.nickname || "",
          username: profileData.userId,
          imageUrl: profileData.imageUrl ?? null,
          genres: profileData.genres || [],
          isMe,
        });
      } catch {
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userId, isMe]);

  const handleLogout = async () => {
    try {
      await authAxios.post("/api/logout");
      setUserId("");
      setIsLoggedIn(false);
      router.push("/");
    } catch {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCopyProfileLink = () => {
    if (!profile) return;
    const profileUrl = `${window.location.origin}/profile/${profile.id}`;
    navigator.clipboard.writeText(profileUrl);
    alert("프로필 링크가 복사되었습니다!");
  };

  const handleGenresSave = (newGenres: string[]) => {
    setProfile((prev) => (prev ? { ...prev, genres: newGenres } : prev));
  };

  if (loading)
    return (
      <div className="px-4 pb-8">
        <ProfileHeaderSkeleton />
      </div>
    );
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="px-4 pb-8">
      <div className="flex flex-col md:flex-between md:flex-row">
        <ProfileHeader
          profile={profile}
          showSensitiveInfo={isMe}
          isMe={isMe}
          publicPlaylistsCount={undefined}
          onCopyProfileLink={handleCopyProfileLink}
        />
        {isMe && (
          <div className="flex px-4 pt-4">
            <button
              className="bg-[#FF6C78] text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 transition w-25 h-10"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <GenreTags
          userId={profile.id}
          genres={profile.genres}
          onSave={handleGenresSave}
          showEditButton={isMe}
        />
      </div>
    </div>
  );
}
