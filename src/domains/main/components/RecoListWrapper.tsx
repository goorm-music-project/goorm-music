"use client";

import JenreRecoList from "./JenreRecoList";
import LikedList from "./LikedList";
import RandomRecoList from "./RandomRecoList";
import TopChartList from "./TopChartList";

export default function RecoListWrapper({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  return (
    <div>
      {isLoggedIn ? <JenreRecoList /> : <TopChartList />}
      {isLoggedIn ? <LikedList /> : <RandomRecoList />}
    </div>
  );
}
