"use client";

import RecoListWrapper from "@/domains/main/components/RecoListWrapper";
import NewReleaseAlbums from "../../domains/main/components/NewReleaseAlbums";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

export default function page() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);

  return (
    <div className="">
      <NewReleaseAlbums />
      <RecoListWrapper isLoggedIn={isLoggedIn} />
    </div>
  );
}
