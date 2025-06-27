/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddNewPlayListModal from "@/domains/playlist/components/AddNewPlayListModal";
import PlayListModal from "@/domains/playlist/components/PlayListModal";
import { Playlist } from "@/domains/playlist/types/Playlist";
import PlaylistBar from "@/domains/search/components/PlaylistBar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("params") || "";
  const [data, setData] = useState<any>([]);
  const [isLoading, setisLoading] = useState(false);
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const [showAddNewPlayListModal, setShowAddNewPlayListModal] = useState(false);
  const [selectTrack, setSelectTrack] = useState<string>("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleShowPlaylist = () => {
    setShowPlayListModal(true);
  };

  const handleShowNewPlayList = () => {
    setShowAddNewPlayListModal(true);
  };

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setisLoading(true);
        const res = await fetch(
          `/api/search?searchText=${encodeURIComponent(query)}`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log("검색 오류", err);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h2 className="mb-2">대표 아티스트</h2>
        <div className="h-[15vh] overflow-y-auto">
          {data &&
            data.artists?.items?.slice(0, 1).map((item: any) => (
              <div key={item.id}>
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <p className="truncate">{item.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">곡</h2>
        <div className="h-[30vh] overflow-y-auto">
          {data &&
            data.tracks?.items?.map((item: any) => (
              <PlaylistBar
                key={item.id}
                item={item}
                handleShowPlaylist={handleShowPlaylist}
                setSelectTrack={setSelectTrack}
              />
            ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">앨범</h2>
        <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
          {data &&
            data.albums?.items?.map((item: any) => (
              <div key={item.id} className="w-[100px] h-[120px] relative">
                <Image src={item.images[0]?.url} alt={item.name} fill />
                <p className="truncate">{item.name}</p>
              </div>
            ))}
        </div>
      </div>
      <PlayListModal
        showModal={showPlayListModal}
        onClose={() => setShowPlayListModal(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
        onShowNewPlaylist={() => handleShowNewPlayList()}
        track={selectTrack}
      />

      <AddNewPlayListModal
        showModal={showAddNewPlayListModal}
        onClose={() => setShowAddNewPlayListModal(false)}
        setPlaylists={setPlaylists}
        track={selectTrack}
      />
    </div>
  );
}
