import { Playlist } from "../types/Profile";

interface Props {
  playlists: Playlist[];
}

const FollowingPlaylist = ({ playlists }: Props) => (
  <div className="flex flex-col gap-4 mt-6">
    {playlists.map((pl) => (
      <div
        key={pl.id}
        className="flex items-center bg-white rounded-xl p-3 sm:p-4 shadow border gap-3 w-full"
      >
        <img
          src={pl.coverImageUrl || "/default-cover.png"}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover"
          alt={pl.name}
        />
        <div className="flex-1">
          <div className="font-bold text-base sm:text-lg mb-1 truncate">
            {pl.name}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default FollowingPlaylist;
