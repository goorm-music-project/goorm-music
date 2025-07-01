"use client";

import RecoListWrapper from "@/domains/main/components/RecoListWrapper";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import MyPlayList from "@/domains/main/components/MyPlayList";
import TopChartList from "@/domains/main/components/TopChartList";

export default function page() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);

  return (
    <div className="">
      <MyPlayList isLoggedIn={isLoggedIn} />
      <RecoListWrapper isLoggedIn={isLoggedIn} />
      <TopChartList />
    </div>
  );
}
