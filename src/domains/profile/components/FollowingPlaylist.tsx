import { Playlist } from "../types/Playlist";

interface Props {
  playlists: Playlist[];
}

const FollowingPlaylist = ({ playlists }: Props) => (
  <div>
    {playlists.map((pl) => (
      <div
        key={pl.id}
        className="flex items-center gap-3 py-2 border-b last:border-b-0"
      >
        <img
          src={pl.coverImageUrl || "/default-cover.png"}
          className="w-14 h-14 rounded"
          alt={pl.name}
        />
        <div>
          <div className="font-bold">{pl.name}</div>
        </div>
      </div>
    ))}
  </div>
);

export default FollowingPlaylist;
