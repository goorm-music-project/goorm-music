/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AlertModal from "@/domains/common/components/AlertModal";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import PlaylistSidebar from "@/domains/playlist/components/PlaylistSidebar";
import PlaylistTracks from "@/domains/playlist/components/PlaylistTracks";
import usePlaylistDetail from "@/domains/playlist/hooks/usePlaylistDetail";
import { usePlaylistProps } from "@/domains/playlist/stores/usePlaylistProps";

export interface DeleteInfo {
  uri: string;
  position: number;
}

export default function Page() {
  const params = useParams();
  const id = params.id;
  const { userId } = userSpotifyStore();
  const { fetchData } = usePlaylistDetail(id, userId);
  const { canEdit, listData } = usePlaylistProps();

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [userId]);

  if (canEdit === null) return <LoadingSpinner />;

  return (
    <div>
      {canEdit && <h1>나의 플레이리스트</h1>}

      {listData && (
        <div className="flex flex-col gap-2 items-center lg:flex-row lg:items-start">
          <PlaylistSidebar id={id as string} />
          <PlaylistTracks id={id as string} fetchData={fetchData} />
        </div>
      )}
      <SuggestLoginModal />
      <AlertModal />
    </div>
  );
}
