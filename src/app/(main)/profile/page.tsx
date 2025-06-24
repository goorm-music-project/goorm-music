"use client";

import PlaylistSection from "@/app/components/profile/PlaylistSection";
import LikesSection from "@/app/components/profile/LikeSection";
import FollowsSection from "@/app/components/profile/FollowSection";
import ProfileTabNav from "@/app/components/profile/ProfileTabNav";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState<"playlist" | "likes" | "follows">(
    "playlist"
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      {/* 상단 바 */}
      <div className="bg-gradient-to-b from-blue-50 to-white px-4 pt-6 pb-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">내 프로필</h1>
        </div>

        {/* 프로필 정보 */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">김뮤직</h2>
            <p className="text-gray-600">@musiclover2025</p>
            <div className="flex space-x-4 text-sm text-gray-600 my-2">
              <span>
                <strong className="text-gray-900">1,234</strong> 팔로워
              </span>
              <span>
                <strong className="text-gray-9 00">567</strong> 팔로잉
              </span>
            </div>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded flex items-center">
              <FaEdit className="mr-1" />
              프로필 편집
            </button>
          </div>
        </div>

        {/* 자기소개 */}
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">자기소개</p>

        {/* 통계 */}
        <div className="grid grid-cols-3 text-center mb-6">
          <div>
            <div className="text-xl font-bold">12</div>
            <div className="text-sm text-gray-600">플레이리스트</div>
          </div>
          <div>
            <div className="text-xl font-bold">89</div>
            <div className="text-sm text-gray-600">좋아요한 곡</div>
          </div>
          <div>
            <div className="text-xl font-bold">1</div>
            <div className="text-sm text-gray-600">팔로우 중</div>
          </div>
        </div>

        {/* 선호 장르 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">선호 장르</h3>
            <button className="text-blue-500 text-xs">편집</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["K-Pop", "Hip Hop", "R&B", "Pop", "Jazz", "Electronic"].map(
              (genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                >
                  {genre}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <ProfileTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 탭 메뉴 아래 콘텐츠 영역 */}
      <div className="px-4">
        {activeTab === "playlist" && <PlaylistSection />}
        {activeTab === "likes" && <LikesSection />}
        {activeTab === "follows" && <FollowsSection />}
      </div>
    </div>
  );
}
