import { Profile } from "@/domains/profile/types/Profile";
import Image from "next/image";

interface ProfileHeaderProps {
  profile: Profile;
  showSensitiveInfo?: boolean;
  isMe?: boolean;
  publicPlaylistsCount?: number;
  onCopyProfileLink?: () => void;
}

export default function ProfileHeader({
  profile,
  showSensitiveInfo = false,
  isMe = false,
  publicPlaylistsCount,
  onCopyProfileLink,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6 py-6 px-4 md:px-8 w-full">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {profile.imageUrl ? (
          <Image
            src={profile.imageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
            width={112}
            height={112}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            {profile.nickname[0] || "U"}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold">
            {profile.nickname}
          </span>
          {!isMe && onCopyProfileLink && (
            <button
              className="ml-1 px-2 py-1 text-xs border rounded hover:bg-gray-100"
              onClick={onCopyProfileLink}
            >
              프로필 링크 복사
            </button>
          )}
        </div>
        {showSensitiveInfo && (
          <div className="break-all text-gray-400 text-base mt-1 w-full">
            {profile.username}
          </div>
        )}
        {!isMe && typeof publicPlaylistsCount === "number" && (
          <div className="mt-1 text-sm text-gray-500">
            공개 플레이리스트 {publicPlaylistsCount}개
          </div>
        )}
      </div>
    </div>
  );
}
