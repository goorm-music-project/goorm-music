"use client";

import BottomNavBar from "@/domains/layout/components/BottomNavBar";
import MobileTopBar from "@/domains/layout/components/MobileTopBar";
import InitUserIdState from "@/domains/common/components/InitUserIdState";
import MiniPlayer from "@/domains/layout/components/MiniPlayer";
import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";
import { useWindowWidth } from "@/domains/common/hooks/useWindowWidth";
import DesktopTopBar from "@/domains/layout/components/DesktopTopBar";
import SideBar from "@/domains/layout/components/SideBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedTrackId } = usePlayerSotre();
  const windowWidth = useWindowWidth();

  return (
    <div className="min-h-screen relative">
      {windowWidth && windowWidth < 768 ? <MobileTopBar /> : <DesktopTopBar />}
      <div
        className={`p-4 fixed left-0 md:left-70 md:right-0 top-16 md:top-25 overflow-y-auto overflow-x-hidden ${
          selectedTrackId ? "h-[calc(86vh-80px)]" : "h-[86vh]"
        }`}
      >
        {children}
      </div>
      <MiniPlayer />
      {windowWidth && windowWidth < 768 ? <BottomNavBar /> : <SideBar />}
      <InitUserIdState />
    </div>
  );
}
