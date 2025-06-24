"use client";

import Link from "next/link";

const dummyFollowedPlaylists = [
  {
    id: "101",
    name: "운동할 때 듣는 EDM",
    description: "에너지 넘치는 트랙으로 운동 집중력 UP!",
    image: "/placeholder-edm.jpg",
    owner: "DJ Max",
  },
  {
    id: "102",
    name: "감성 R&B",
    description: "잔잔한 밤에 어울리는 감성 모음",
    image: "/placeholder-rnb.jpg",
    owner: "soulmusic_99",
  },
  {
    id: "103",
    name: "출퇴근용 팝송",
    description: "지루한 출근길을 책임지는 팝 모음",
    image: "/placeholder-pop.jpg",
    owner: "commuter_day",
  },
];

export default function FollowsSection() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">팔로우한 플레이리스트</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyFollowedPlaylists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlist/${playlist.id}`}
            className="bg-gray-100 hover:bg-gray-200 transition rounded-lg p-4 flex items-start gap-4"
          >
            <div className="w-16 h-16 bg-gray-300 rounded overflow-hidden"></div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{playlist.name}</p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">by {playlist.owner}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
