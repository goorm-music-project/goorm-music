"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMusic, FaHome, FaUser } from "react-icons/fa";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";

export default function BottomNavBar() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-(--primary-blue) text-white h-16 flex justify-around items-center z-50">
        <div
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => router.push("/genre")}
        >
          <FaMusic size={20} />
          <span className="mt-1">장르 검색</span>
        </div>
        <div
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FaHome size={20} />
          <span className="mt-1">홈</span>
        </div>

        <div
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaUser size={20} />
          <span className="mt-1">마이 페이지</span>
        </div>
      </nav>

      <SuggestLoginModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
