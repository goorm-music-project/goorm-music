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
      {windowWidth && windowWidth < 768 ? <MobileTopBar /> : <DesktopTopBar />}
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
