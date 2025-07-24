"use client";

import { FaSearch, FaUser } from "react-icons/fa";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";

export default function DesktopTopBar() {
  const [searchText, setSearchText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const userId = userSpotifyStore((state) => state.userId);
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    router.push(`/search?params=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="w-full h-25 px-4 flex items-center justify-between border-b-2 border-(--primary-blue) bg-(--background) fixed top-0 left-0 z-50">
      <Image
        src="/goorm_logo_blue.png"
        alt="로고"
        className="mr-3 cursor-pointer"
        width={100}
        height={100}
        onClick={() => router.push("/")}
      />
      <form
        className="flex items-center rounded-full px-4 py-2 w-full max-w-[550px] border-2 border-(--primary-blue) hover:bg-blue-100"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow outline-none text-black bg-transparent placeholder-gray-400"
          style={{ border: "none" }}
        />
        <button type="submit">
          <FaSearch className="text-(--primary-blue)" />
        </button>
      </form>
      <FaUser
        size={30}
        className="text-blue-300 text-xl cursor-pointer"
        onClick={() => {
          if (!isLoggedIn) {
            setShowLoginModal(true);
          } else {
            router.push(`/profile/${userId}`);
          }
        }}
      />

      <SuggestLoginModal
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
