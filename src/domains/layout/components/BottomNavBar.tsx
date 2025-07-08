"use client";

import { useRouter } from "next/navigation";

import { FaMusic, FaHome, FaUser } from "react-icons/fa";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-(--primary-blue) text-white h-16 flex justify-around items-center z-50">
      <NavItem icon={<FaMusic size={20} />} label="장르 검색" path="/genre" />
      <NavItem icon={<FaHome size={20} />} label="홈" path="/" />
      <NavItem
        icon={<FaUser size={20} />}
        label="마이 페이지"
        path="/profile"
      />
    </nav>
  );
}

function NavItem({
  icon,
  label,
  path,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
}) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center text-sm cursor-pointer"
      onClick={() => router.push(path)}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </div>
  );
}
