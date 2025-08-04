"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useLoginModalStore } from "@/domains/common/stores/useLoginModalStore";

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  filledIcon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, userId } = userSpotifyStore();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { setShowLoginModal } = useLoginModalStore();

  const navItems: NavItem[] = [
    {
      id: "genre",
      path: "/genre",
      label: "장르 검색",
      icon: IoMusicalNotesOutline,
      filledIcon: IoMusicalNotes,
    },
    {
      id: "home",
      path: "/",
      label: "홈",
      icon: IoHomeOutline,
      filledIcon: IoHome,
    },
    {
      id: "profile",
      path: `/profile/${userId}`,
      label: "마이 페이지",
      icon: FaRegUser,
      filledIcon: FaUser,
    },
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id);

    setTimeout(() => {
      setActiveItem(null);
    }, 150);

    if (item.id === "profile") {
      if (isLoggedIn && userId) {
        router.push(item.path);
      } else {
        setShowLoginModal(true);
      }
    } else {
      router.push(item.path);
    }
  };

  const isCurrentPage = (item: NavItem) => {
    if (item.id === "home") {
      return pathname === "/";
    }
    if (item.id === "profile") {
      return pathname.startsWith("/profile/");
    }
    return pathname.startsWith(item.path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-(--primary-blue) text-white h-16 grid grid-cols-3 items-center z-50">
        {navItems.map((item) => {
          const isActive = isCurrentPage(item);
          const isTouched = activeItem === item.id;
          const IconComponent = isActive ? item.filledIcon : item.icon;

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center text-sm cursor-pointer transition-all duration-150 h-full ${
                isTouched ? "bg-[#96d3ff]" : ""
              } ${isActive ? "text-white" : "text-gray-200"}`}
              onClick={() => handleNavClick(item)}
            >
              <IconComponent
                size={20}
                className={isActive ? "text-white" : "text-gray-200"}
              />
              <span className={`mt-1 ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <SuggestLoginModal />
    </>
  );
}
