// src/domains/profile/components/ProfileHeader.tsx
import React from "react";
import { Profile } from "../types/Profile";

interface Props {
  profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt={profile.nickname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
            <span role="img" aria-label="user"></span>
          </div>
        )}
      </div>
      <span className="text-2xl font-bold break-all">{profile.nickname}</span>
      <div className="text-gray-500 text-sm mt-1 break-all">
        @{profile.username}
      </div>
    </div>
  );
};

export default ProfileHeader;
