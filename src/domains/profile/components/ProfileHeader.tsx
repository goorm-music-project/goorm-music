import { Profile } from "../types/Profile";

interface Props {
  profile: Profile;
  onEdit: () => void;
}

const ProfileHeader = ({ profile, onEdit }: Props) => (
  <div className="flex items-center gap-6">
    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-500">
      {profile.profileImageUrl ? (
        <img
          src={profile.profileImageUrl}
          alt="프로필"
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        profile.nickname[0] // 이니셜
      )}
    </div>
    <div className="flex-1">
      <div className="text-2xl font-bold">{profile.nickname}</div>
      <div className="text-gray-600">@{profile.username}</div>
      <div className="flex gap-4 mt-1 text-gray-500 font-semibold">
        <span>
          {profile.followerCount} <span className="font-normal">팔로워</span>
        </span>
        <span>·</span>
        <span>
          {profile.followingCount} <span className="font-normal">팔로잉</span>
        </span>
      </div>
    </div>
    {profile.isMe && (
      <button
        className="h-10 px-5 rounded-lg bg-blue-500 text-white font-bold text-base hover:bg-blue-600"
        onClick={onEdit}
      >
        프로필 편집
      </button>
    )}
    {!profile.isMe && (
      <button className="h-10 px-5 rounded-lg bg-blue-100 text-blue-700 font-bold text-base">
        {profile.isFollowing ? "팔로잉" : "팔로우"}
      </button>
    )}
  </div>
);

export default ProfileHeader;
