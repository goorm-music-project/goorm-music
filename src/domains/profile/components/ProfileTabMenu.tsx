import { FaMusic, FaHeart, FaUsers } from "react-icons/fa";

interface Props {
  tab: "playlists" | "liked" | "following";
  onTabChange: (tab: "playlists" | "liked" | "following") => void;
}

const ProfileTabMenu = ({ tab, onTabChange }: Props) => (
  <div className="flex w-full mt-8 border-b">
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
  </div>
);

export default ProfileTabMenu;
