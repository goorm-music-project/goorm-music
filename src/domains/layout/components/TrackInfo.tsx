import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";

interface TrackInfoProps {
  track: Spotify.Track | null;
  isLoading: boolean;
}

export default function TrackInfo({ track, isLoading }: TrackInfoProps) {
  const { selectedTrackId } = usePlayerStore();
  const router = useRouter();

  const handleTrackClick = () => {
    if (track) {
      router.push(`/track/${track.id}`);
    }
  };

  if (track) {
    return (
      <div
        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer rounded-md transition hover:bg-gray-800"
        onClick={handleTrackClick}
      >
        {/* 앨범 아트 */}
        <div className="flex-shrink-0">
          <Image
            src={track.album.images[0]?.url || "/goorm_logo_blue.png"}
            alt={track.name}
            width={48}
            height={48}
            className="rounded-md shadow-md"
          />
        </div>
        {/* 트랙 정보 */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-semibold text-white truncate">
            {track.name}
          </span>
          <span className="text-xs text-gray-300 truncate">
            {track.artists.map((a: any) => a.name).join(", ")}
          </span>
        </div>
      </div>
    );
  }

  if (!track && selectedTrackId) {
    return (
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
          <span className="text-white text-lg">🎵</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium text-white">
            {isLoading ? "재생 중..." : "트랙 로딩 중..."}
          </span>
        </div>
      </div>
    );
  }

  return null;
} 