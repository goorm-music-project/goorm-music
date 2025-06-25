"use client";
import PlaylistList from "@/app/components/PlaylistList";

export default function PlaylistSection() {
  const playlists = [
    {
      id: "1",
      name: "내가 좋아하는 K-Pop",
      image: "/placeholder.jpg",
      trackCount: 25,
    },
    {
      id: "2",
      name: "감성 R&B 모음",
      image: "/placeholder2.jpg",
      trackCount: 18,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">내 플레이리스트</h2>
        <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
          + 새 플레이리스트
        </button>
      </div>
      <PlaylistList playlists={playlists} />
    </div>
  );
}
