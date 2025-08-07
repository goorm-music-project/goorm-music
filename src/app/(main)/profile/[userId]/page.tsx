"use client";

import { useParams } from "next/navigation";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import ProfileHeaderArea from "@/domains/profile/components/ProfileHeaderArea";
import ProfileTabArea from "@/domains/profile/components/ProfileTabArea";
import { useState } from "react";

export default function ProfilePage() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const myUserId = userSpotifyStore((state) => state.userId);

  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? params.userId[0]
    : params?.userId;
  const isMe = myUserId === userId;

  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );

  if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;
  if (!userId) return <div>유저 정보가 없습니다.</div>;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pb-24 min-h-full overflow-y-auto">
      <ProfileHeaderArea userId={userId} isMe={isMe} />
      <ProfileTabArea
        tab={tab}
        onTabChange={setTab}
        userId={userId}
        isMe={isMe}
      />
    </div>
  );
}
