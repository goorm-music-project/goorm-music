import Link from "next/link";
import { Playlist } from "../types/Playlist";

interface Props {
  playlists: Playlist[];
}

const PlaylistList = ({ playlists }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    {playlists.map((playlist) => (
      <Link
        key={playlist.id}
        href={`/playlist/${playlist.id}`}
        className="flex flex-col items-center bg-white rounded-xl p-4 shadow border hover:bg-gray-50 transition"
        style={{ textDecoration: "none" }}
      >
        <div className="w-16 h-16 rounded-lg bg-gray-200 mb-3" />
        <div className="font-bold text-base mb-1">{playlist.name}</div>
        <div className="text-xs text-gray-500 mb-1">{playlist.description}</div>
        <div className="text-xs text-gray-400">{playlist.trackCount}곡</div>
      </Link>
    ))}
  </div>
);

export default PlaylistList;
