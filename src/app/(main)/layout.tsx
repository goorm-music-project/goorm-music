"use client";

import BottomNavBar from "@/domains/layout/components/BottomNavBar";
import MobileTopBar from "@/domains/layout/components/MobileTopBar";
import InitUserIdState from "@/domains/common/components/InitUserIdState";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import { useWindowWidth } from "@/domains/common/hooks/useWindowWidth";
import DesktopTopBar from "@/domains/layout/components/DesktopTopBar";
import SideBar from "@/domains/layout/components/SideBar";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import SdkMiniPlayer from "@/domains/layout/components/SdkMiniPlayer";
import EmbedMiniPlayer from "@/domains/layout/components/EmbedMiniPlayer";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedTrackId } = usePlayerStore();
  const windowWidth = useWindowWidth();
  const { product, isLoggedIn } = userSpotifyStore();

  return (
    <div className="min-h-screen relative">
      <Suspense fallback={<div className="fixed top-0 left-0 right-0 bg-(--primary-blue) h-16 flex justify-between items-center px-4 z-50">
        <div className="w-12 h-12 mr-3 bg-white rounded"></div>
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-[550px]">
          <div className="flex-grow h-4 bg-gray-200 rounded"></div>
        </div>
      </div>}>
        {windowWidth && windowWidth < 768 ? <MobileTopBar /> : <DesktopTopBar />}
      </Suspense>
      <div
        className={`w-full md:w-auto p-4 md:pb-0 pb-12 fixed left-0 top-16 overflow-y-auto overflow-x-hidden md:top-25 md:left-65 md:right-0 ${
          selectedTrackId
            ? "h-[calc(86vh-80px)] md:h-[calc(86vh-65px)] "
            : "h-[86vh] md:h-[calc(100vh-100px)]"
        }`}
      >
        {children}
      </div>
      {isLoggedIn && product === "premium" ? (
        <SdkMiniPlayer />
      ) : (
        <EmbedMiniPlayer />
      )}
      {windowWidth && windowWidth < 768 ? <BottomNavBar /> : <SideBar />}
      <InitUserIdState />
    </div>
  );
}
