import JenreRecoList from "@/domains/main/components/JenreRecoList";
import LikedList from "@/domains/main/components/LikedList";
import PopRecoList from "@/domains/main/components/PopRecoList";
import TopChartList from "@/domains/main/components/TopChartList";
import React from "react";

export default function RecoListWrapper({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  return (
    <div>
      {isLoggedIn ? <JenreRecoList /> : <TopChartList />}
      {isLoggedIn ? <LikedList /> : <PopRecoList />}
    </div>
  );
}
