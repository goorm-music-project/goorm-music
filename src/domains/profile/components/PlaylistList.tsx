import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";

interface Props {
  playlists: Playlist[];
}

const PlaylistList = ({ playlists }: Props) => {
  const router = useRouter();

  const handleGoDetail = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
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
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-200 flex-shrink-0" />
          )}

          <div className="flex-1 basis-0 min-w-0 max-w-full">
            <div className="font-bold text-sm sm:text-base mb-1 truncate">
              {playlist.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
              {playlist.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
