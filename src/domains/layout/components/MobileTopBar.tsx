"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function MobileTopBar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    router.push(`/search?params=${encodeURIComponent(searchText)}`);
  };

  useEffect(() => {
    if (!pathname.includes("/search")) {
      setSearchText("");
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-(--primary-blue) h-16 flex justify-between items-center px-4 z-50">
      <Link href={"/"}>
        <Image
          src="/goorm_logo_white.png"
          alt="로고"
          className="w-12 h-12 mr-3"
          width={100}
          height={100}
        />
      </Link>

      <form
        className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-[550px] hover:bg-blue-100"
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
    </div>
  );
}
