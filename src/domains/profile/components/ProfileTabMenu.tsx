import { FaMusic, FaHeart, FaUsers } from "react-icons/fa";

interface Props {
  tab: "playlists" | "liked" | "following";
  onTabChange: (tab: "playlists" | "liked" | "following") => void;
  tabs: ("playlists" | "liked" | "following")[]; // 추가
}

const ProfileTabMenu = ({ tab, onTabChange, tabs }: Props) => (
  <div className="flex justify-between text-sm font-medium border-b mb-2 whitespace-nowrap">
    {tabs.includes("playlists") && (
      <button
        onClick={() => onTabChange("playlists")}
        className={`flex-1 py-3 text-base font-semibold flex justify-center items-center gap-1 border-b-2 transition ${
          tab === "playlists"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500"
        }`}
      >
        <span className="hidden sm:inline">
          <FaMusic />
        </span>
        플레이리스트
      </button>
    )}
    {tabs.includes("liked") && (
      <button
        onClick={() => onTabChange("liked")}
        className={`flex-1 py-3 text-base font-semibold flex justify-center items-center gap-1 border-b-2 transition ${
          tab === "liked"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500"
        }`}
      >
        <span className="hidden sm:inline">
          <FaHeart />
        </span>
        좋아요
      </button>
    )}
    {tabs.includes("following") && (
      <button
        onClick={() => onTabChange("following")}
        className={`flex-1 py-3 text-base font-semibold flex justify-center items-center gap-1 border-b-2 transition ${
          tab === "following"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500"
        }`}
      >
        <span className="hidden sm:inline">
          <FaUsers />
        </span>
        팔로우
      </button>
    )}
  </div>
);

export default ProfileTabMenu;
