// src/domains/profile/components/ProfileHeader.tsx

import { Profile } from "../types/Profile";

interface ProfileHeaderProps {
  profile: Profile;
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
}

export default function ProfileHeader({
  profile,
  onEditProfile,
  onFollowToggle,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center py-8 bg-gradient-to-b from-blue-50 to-white rounded-b-2xl">
      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
        {/* 프로필 이미지 */}
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
            👤
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">{profile.nickname}</span>
        <span className="text-gray-500">@{profile.username}</span>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="text-center">
          <div className="font-bold">
            {profile.followerCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">팔로워</div>
        </div>
        <div className="text-center">
          <div className="font-bold">
            {profile.followingCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">팔로잉</div>
        </div>
      </div>
      {/* 프로필 소개 */}
      <div className="mt-4 text-gray-700">{profile.bio}</div>
      {/* 내 프로필일 때만 편집 버튼 */}
      {profile.isMe ? (
        <button
          className="mt-4 px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600"
          onClick={onEditProfile}
        >
          프로필 편집
        </button>
      ) : (
        <button
          className={`mt-4 px-5 py-2 rounded-lg text-sm font-semibold border transition
            ${
              profile.isFollowing
                ? "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            }
          `}
          onClick={onFollowToggle}
        >
          {profile.isFollowing ? "팔로우 취소" : "팔로우"}
        </button>
      )}
    </div>
  );
}
