import { Profile } from "../types/Profile";

interface Props {
  profile: Profile;
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-200" />
      <div className="flex flex-col">
        <div className="font-bold text-lg">{profile.nickname}</div>
        <div className="text-gray-500 text-sm">@{profile.username}</div>
      </div>
      {/* 팔로워/팔로잉/편집 버튼 없음 */}
    </div>
  );
}
