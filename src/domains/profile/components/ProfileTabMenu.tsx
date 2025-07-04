// src/domains/profile/components/ProfileTabMenu.tsx
"use client";

import { useState } from "react";

type TabKey = "playlist" | "liked" | "following";

interface ProfileTabMenuProps {
  playlist: React.ReactNode;
  liked: React.ReactNode;
  following: React.ReactNode;
}

const TAB_LABELS: Record<TabKey, string> = {
  playlist: "플레이리스트",
  liked: "좋아요",
  following: "팔로우",
};

export default function ProfileTabMenu({
  playlist,
  liked,
  following,
}: ProfileTabMenuProps) {
  const [tab, setTab] = useState<TabKey>("playlist");

  return (
    <div className="mt-8">
      <div className="flex w-full bg-gray-100 rounded-xl overflow-hidden mb-4">
        {Object.entries(TAB_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`flex-1 py-2 text-center font-semibold text-sm transition
              ${
                tab === key
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
            onClick={() => setTab(key as TabKey)}
          >
            {label}
          </button>
        ))}
      </div>
      {/* 탭별 콘텐츠 */}
      <div>
        {tab === "playlist" && playlist}
        {tab === "liked" && liked}
        {tab === "following" && following}
      </div>
    </div>
  );
}
