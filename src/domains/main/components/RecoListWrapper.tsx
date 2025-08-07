import JenreRecoList from "@/domains/main/components/JenreRecoList";
import React from "react";
import NewReleaseAlbum from "./NewReleaseAlbums";

export default function RecoListWrapper({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  return (
    <div className="my-10">
      {isLoggedIn ? <JenreRecoList /> : <NewReleaseAlbum />}
    </div>
  );
}
