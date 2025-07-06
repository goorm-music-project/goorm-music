import { Track } from "../types/Track";

interface Props {
  tracks: Track[];
}

const LikedTrackList = ({ tracks }: Props) => (
  <div>
    {tracks.map((track) => (
      <div
        key={track.id}
        className="flex items-center gap-3 py-2 border-b last:border-b-0"
      >
        <img
          src={track.albumCoverUrl || "/default-cover.png"}
          className="w-12 h-12 rounded"
          alt={track.title}
        />
        <div>
          <div className="font-bold">{track.title}</div>
          <div className="text-xs text-gray-500">{track.artist}</div>
        </div>
        <span className="ml-auto text-xs text-gray-400">
          {Math.floor(track.duration / 60)}:
          {(track.duration % 60).toString().padStart(2, "0")}
        </span>
        {track.isLiked && <span className="ml-2 text-pink-500">♥</span>}
      </div>
    ))}
  </div>
);

export default LikedTrackList;
