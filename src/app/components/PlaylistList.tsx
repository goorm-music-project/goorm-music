import PlaylistCard from "./PlaylistCard";

type Playlist = {
  id: string;
  name: string;
  trackCount: number;
};

export default function PlaylistList({ playlists }: { playlists: Playlist[] }) {
  return (
    <section className="px-4">
      <h2 className="text-lg font-semibold mb-4">내가 만든 플레이리스트</h2>
      <div className="flex flex-col gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>
    </section>
  );
}
