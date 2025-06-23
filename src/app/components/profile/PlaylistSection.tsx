"use client";

import { FaPlus } from "react-icons/fa";

export default function PlaylistSection() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">내 플레이리스트</h2>
        <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center">
          <FaPlus className="mr-1" /> 새 플레이리스트
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2].map((id) => (
          <div
            key={id}
            className="flex items-center space-x-4 bg-gray-100 p-4 rounded"
          >
            <div className="w-16 h-16 bg-gray-300 rounded" />
            <div className="flex-1">
              <div className="text-sm font-semibold">내가 좋아하는 K-Pop</div>
              <div className="text-xs text-gray-600">
                최신 K-Pop 히트곡들을 모아놨어요 · 25곡
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
