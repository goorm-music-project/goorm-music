import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";

interface Props {
  playlists: Playlist[];
  isMe: boolean;
}

const PlaylistList = ({ playlists }: Props) => {
  const router = useRouter();

  const handleGoDetail = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  const getTrackCount = (playlist: Playlist) => {
    if ("trackCount" in playlist && typeof playlist.trackCount === "number") {
      return playlist.trackCount;
    }
    if ("tracks" in playlist && typeof playlist.tracks?.total === "number") {
      return playlist.tracks.total;
    }
    return 0;
  };

  const getIsPublic = (playlist: Playlist) => {
    if ("isPublic" in playlist) return !!playlist.isPublic;
    if ("public" in playlist) return !!playlist.public;
    return false;
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex items-center bg-white rounded-xl p-2 sm:p-4 shadow border gap-2 sm:gap-4 cursor-pointer transition hover:bg-blue-50"
          onClick={() => handleGoDetail(playlist.id)}
        >
          {/* 앨범 커버 */}
          {playlist.images && playlist.images[0]?.url ? (
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              className="rounded-lg object-cover flex-shrink-0"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-200 flex-shrink-0" />
          )}

          {/* 정보 */}
          <div className="flex-1 basis-0 min-w-0 max-w-full">
            <div className="font-bold text-sm sm:text-base mb-1 truncate">
              {playlist.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
              {playlist.description}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate">
              {getTrackCount(playlist)}곡
              <span
                className={`ml-2 px-2 py-1 rounded text-xs sm:text-sm ${
                  getIsPublic(playlist)
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {getIsPublic(playlist) ? "공개" : "비공개"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
