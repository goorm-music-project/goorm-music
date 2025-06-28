"use client";

import BottomNavBar from "@/domains/layout/components/BottomNavBar";
import MobileTopBar from "@/domains/layout/components/MobileTopBar";
import InitUserIdState from "@/domains/common/components/InitUserIdState";
import { useEffect } from "react";
import axios from "axios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const tryRefresh = async () => {
      const res = await fetch("/api/refresh-token", { method: "POST" });

      if (res.status === 200) {
        // 토큰 새로고침 성공했으면 사용자 정보 요청
        const userData = await axios.post("/api/userData");
        const { userId } = userData.data;

        if (userId) {
          userSpotifyStore.getState().setUserId(userId);
          userSpotifyStore.getState().setIsLoggedIn(true);
        }
      }
    };

    tryRefresh();
  }, []);

  return (
    <div className="min-h-screen relative pb-16">
      <MobileTopBar />
      <div className="w-full p-4 fixed left-0 top-16 h-[86vh] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <BottomNavBar />
      <InitUserIdState />
    </div>
  );
}
