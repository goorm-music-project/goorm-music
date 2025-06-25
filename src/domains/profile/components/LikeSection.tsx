"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function LikesSection() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">좋아요한 곡</h2>
      <div className="space-y-3">
        {[1, 2, 3].map((id) => (
          <Link key={id} href={`/track/${id}`}>
            <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition cursor-pointer">
              <div className="w-14 h-14 bg-gray-300 rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">노래 제목 {id}</p>
                <p className="text-xs text-gray-600 truncate">
                  아티스트 · 앨범
                </p>
              </div>
              <button className="text-gray-500 hover:text-pink-500">
                <FaHeart />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
