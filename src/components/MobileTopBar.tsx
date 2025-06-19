"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function MobileTopBar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    router.push(`/search?params=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#6CC2FF] h-16 flex justify-between items-center px-4 z-50">
      <img src="/goorm_logo_white.png" alt="로고" className="w-12 h-12 mr-3" />

      <form
        className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-[550px]"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow outline-none text-black bg-transparent placeholder-gray-400"
        />
        <button type="submit">
          <FaSearch className="text-[#6CC2FF]" />
        </button>
      </form>
    </div>
  );
}
