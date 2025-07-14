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
    <div className="flex items-center gap-4 py-4 px-2 sm:px-4">
      {/* 프로필 이미지 */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
        {profile.imageUrl ? (
          <Image
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
      {/* 닉네임 및 추가 정보 */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold">
            {profile.nickname}
          </span>
          {/* 타인 프로필일 때만 복사 버튼 노출 */}
          {!isMe && onCopyProfileLink && (
            <button
              className="ml-1 px-2 py-1 text-xs border rounded hover:bg-gray-100"
              onClick={onCopyProfileLink}
            >
              프로필 링크 복사
            </button>
          )}
        </div>
        {/* 민감정보(내 프로필)만 노출 */}
        {showSensitiveInfo && (
          <div className="break-all text-gray-400 text-base mt-1 w-full">
            {profile.username}
          </div>
        )}
        {/* 타인 프로필에서 공개 플레이리스트 개수 표시 */}
        {!isMe && typeof publicPlaylistsCount === "number" && (
          <div className="mt-1 text-sm text-gray-500">
            공개 플레이리스트 {publicPlaylistsCount}개
          </div>
        )}
      </div>
    </div>
  );
}
