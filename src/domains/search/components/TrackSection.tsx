import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import React from "react";

export default function TrackSection({ data }: { data: PlaylistItem[] }) {
  return (
    <div className="h-[30vh] overflow-y-auto">
      {data && <PlayBar tracks={data} />}
    </div>
  );
}
