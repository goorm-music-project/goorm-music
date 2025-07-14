import Image from "next/image";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";

interface Props {
  playlists: Playlist[];
  onUnfollow?: (playlistId: string) => void; // 언팔로우 콜백(필수는 아님)
}

const FollowingPlaylist = ({ playlists, onUnfollow }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 mt-6">
      {playlists.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          팔로우한 플레이리스트가 없습니다.
        </div>
      ) : (
        playlists.map((pl) => (
          <div
            key={pl.id}
            className="flex items-center rounded-xl p-3 sm:p-4 shadow border gap-3 w-full group"
          >
            <Image
              src={pl.coverImageUrl || "/default-cover.png"}
              className="rounded object-cover cursor-pointer"
              alt={pl.name}
              onClick={() => router.push(`/playlist/${pl.id}`)}
              width={64}
              height={64}
            />
            <div
              className="flex-1 cursor-pointer"
              onClick={() => router.push(`/playlist/${pl.id}`)}
            >
              <div className="font-bold text-base sm:text-lg mb-1 truncate">
                {pl.name}
              </div>
            </div>
            {onUnfollow && (
              <button
                className="ml-2 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                onClick={() => onUnfollow(pl.id)}
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
