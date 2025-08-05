import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import React from "react";

export default function TrackSection({ data }: { data: PlaylistItem[] }) {
  return (
    <div className="overflow-y-auto">
      {data.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <PlayBar tracks={data} className={"twoGrid"} />
      )}
    </div>
  );
}
