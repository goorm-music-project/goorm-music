"use client";

import BottomNavBar from "@/domains/layout/components/BottomNavBar";
import MobileTopBar from "@/domains/layout/components/MobileTopBar";
import InitUserIdState from "@/domains/common/components/InitUserIdState";
import { useEffect } from "react";
import axios from "axios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import MiniPlayer from "@/domains/layout/components/MiniPlayer";
import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedTrackId } = usePlayerSotre();

  useEffect(() => {
    const tryRefresh = async () => {
      const res = await fetch("/api/refresh-token", { method: "POST" });

      if (res.status === 200) {
        const userData = await axios.post("/api/userData");
        const { userId } = userData.data;

        if (userId) {
          userSpotifyStore.getState().setUserId(userId);
          userSpotifyStore.getState().setIsLoggedIn(true);
        }
      } else {
        userSpotifyStore.getState().setUserId("");
        userSpotifyStore.getState().setIsLoggedIn(false);
      }
    };

    tryRefresh();
  }, []);

  return (
    <div className="min-h-screen relative">
      <MobileTopBar />
      <div
        className={`w-full p-4 fixed left-0 top-16 overflow-y-auto overflow-x-hidden ${
          selectedTrackId ? "h-[calc(86vh-175px)]" : "h-[86vh]"
        }`}
      >
        {children}
      </div>
      <MiniPlayer />
      <BottomNavBar />
      <InitUserIdState />
    </div>
  );
}
