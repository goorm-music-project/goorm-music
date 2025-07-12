import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";
import EmptyMessage from "./EmptyMessage";

interface Props {
  playlists: Playlist[];
  onUnfollow?: (playlistId: string) => void;
}

const FollowingPlaylist = ({ playlists, onUnfollow }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 md:gap-4 mt-6">
      {playlists.length === 0 ? (
        <EmptyMessage message="팔로우한 플레이리스트가 없습니다." />
      ) : (
        playlists.map((pl) => (
          <div
            key={pl.id}
            className="flex items-center bg-white rounded-xl p-2 md:p-4 shadow border gap-2 md:gap-4 cursor-pointer transition hover:bg-blue-50"
            onClick={() => router.push(`/playlist/${pl.id}`)}
          >
            {pl.coverImageUrl ? (
              <Image
                src={pl.coverImageUrl}
                alt={pl.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                width={64}
                height={64}
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-200 flex-shrink-0" />
            )}
            <div className="flex-1 basis-0 min-w-0 max-w-full">
              <div className="font-bold text-sm md:text-base mb-1 truncate">
                {pl.name}
              </div>
            </div>
            {onUnfollow && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnfollow(pl.id);
                }}
                className="ml-2 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                aria-label="언팔로우"
              >
                삭제
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FollowingPlaylist;
