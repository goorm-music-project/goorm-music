"use client";

export default function FollowsSection() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">팔로우 중인 플레이리스트</h2>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2].map((id) => (
          <div
            key={id}
            className="flex items-center space-x-4 bg-gray-100 p-4 rounded"
          >
            <div className="w-16 h-16 bg-gray-300 rounded" />
            <div className="flex-1">
              <div className="text-sm font-semibold">집중할때듣기좋은노래</div>
              <div className="text-xs text-gray-600">집중업 · 12곡</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
