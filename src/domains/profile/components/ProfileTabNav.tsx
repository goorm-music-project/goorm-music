"use client";

import { FaMusic, FaHeart, FaUserFriends } from "react-icons/fa";

interface ProfileTabNavProps {
  activeTab: "playlist" | "likes" | "follows";
  setActiveTab: (tab: "playlist" | "likes" | "follows") => void;
}

export default function ProfileTabNav({
  activeTab,
  setActiveTab,
}: ProfileTabNavProps) {
  const tabs = [
    {
      key: "playlist",
      icon: <FaMusic className="text-xs" />,
      label: "플레이리스트",
    },
    { key: "likes", icon: <FaHeart className="text-xs" />, label: "좋아요" },
    {
      key: "follows",
      icon: <FaUserFriends className="text-xs" />,
      label: "팔로우",
    },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-2 text-sm text-center mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`py-3 rounded-xl flex justify-center items-center gap-1 transition font-medium ${
            activeTab === tab.key
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
