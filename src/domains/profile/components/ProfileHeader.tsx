import { Profile } from "../types/Profile";

interface Props {
  profile: Profile;
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4 py-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl text-gray-400"></span>
        )}
      </div>

      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="font-bold text-base sm:text-lg">{profile.nickname}</div>
        <div className="text-gray-500 text-xs sm:text-sm">
          @{profile.username}
        </div>
      </div>
    </div>
  );
}
