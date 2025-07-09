// /domains/profile/components/ProfileHeader.tsx

import { Profile } from "@/domains/profile/types/Profile";

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 py-4 px-2 sm:px-4">
      {/* 프로필 이미지 */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl bg-gray-100">
            <span>{profile.nickname[0] || "U"}</span>
          </div>
        )}
      </div>
      {/* 닉네임, 이메일 */}
      <div className="flex flex-col justify-center">
        <span className="text-lg sm:text-xl font-bold">{profile.nickname}</span>
        <span className="text-sm sm:text-base text-gray-500">
          {profile.username}
        </span>
      </div>
    </div>
  );
}
