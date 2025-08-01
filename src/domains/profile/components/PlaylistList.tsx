import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";
import EmptyMessage from "./EmptyMessage";

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
    <div className="flex flex-col gap-2 md:gap-2 mt-6">
      {playlists.length === 0 ? (
        <EmptyMessage message="플레이리스트가 없습니다." />
      ) : (
        playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center bg-white rounded-xl p-2 md:p-4 shadow border gap-2 md:gap-4 cursor-pointer transition hover:bg-blue-50"
            onClick={() => handleGoDetail(playlist.id)}
          >
            {playlist.images && playlist.images[0]?.url ? (
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                width={64}
                height={64}
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-200 flex-shrink-0" />
            )}

            <div className="flex-1 basis-0 min-w-0 max-w-full">
              <div className="font-bold text-sm md:text-base mb-1 truncate">
                {playlist.name}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mb-1 truncate">
                {playlist.description}
              </div>
              <div className="text-xs md:text-sm text-gray-400 truncate">
                {getTrackCount(playlist)}곡
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs md:text-sm ${
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
        ))
      )}
    </div>
  );
};

export default PlaylistList;
