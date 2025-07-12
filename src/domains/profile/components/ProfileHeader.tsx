// src/domains/profile/components/ProfileHeader.tsx

import { Profile } from "@/domains/profile/types/Profile";

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6 py-6 px-4 md:px-8 w-full">
      {/* 프로필 이미지 */}
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            {profile.nickname[0] || "U"}
          </div>
        )}
      </div>
      {/* 닉네임, 이메일 */}
      <div className="flex flex-col justify-center">
        <span className="text-xl md:text-3xl font-bold">
          {profile.nickname}
        </span>
        <span className="mt-1 text-sm md:text-base text-gray-500 break-all">
          {profile.username}
        </span>
      </div>
    </div>
  );
}
