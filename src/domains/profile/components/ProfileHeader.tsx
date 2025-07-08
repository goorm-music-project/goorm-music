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
    </div>
  );
}
