import ProfileHeader from "./ProfileHeader";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import GenreTags from "./GenreTags";
import { Profile } from "@/domains/profile/types/Profile";

interface ProfileHeaderAreaProps {
  loading: boolean;
  profile: Profile | null;
  isMe: boolean;
  publicPlaylistsCount?: number;
  onCopyProfileLink?: () => void;
  onLogout: () => void;
  onGenresSave: (genres: string[]) => void;
}

export default function ProfileHeaderArea({
  loading,
  profile,
  isMe,
  publicPlaylistsCount,
  onCopyProfileLink,
  onLogout,
  onGenresSave,
}: ProfileHeaderAreaProps) {
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
          publicPlaylistsCount={publicPlaylistsCount}
          onCopyProfileLink={onCopyProfileLink}
        />
        {isMe && (
          <div className="flex px-4 pt-4">
            <button
              className="bg-[#FF6C78] text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 transition w-25 h-10"
              onClick={onLogout}
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
          onSave={onGenresSave}
          showEditButton={isMe}
        />
      </div>
    </div>
  );
}
