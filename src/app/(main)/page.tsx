"use client";

import NewReleaseAlbums from "../../domains/main/components/NewReleaseAlbums";
import RandomRecoList from "../../domains/main/components/RandomRecoList";
import TopChartList from "../../domains/main/components/TopChartList";
import JenreRecoList from "@/domains/main/components/JenreRecoList";
import LikedList from "@/domains/main/components/LikedList";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

export default function page() {
  const { isLoggedIn } = userSpotifyStore.getState();

  return (
    <div className="">
      <NewReleaseAlbums />
      {isLoggedIn ? <JenreRecoList /> : <TopChartList />}
      {isLoggedIn ? <LikedList /> : <RandomRecoList />}
    </div>
  );
}
