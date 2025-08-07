"use client";

import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { usePlaylistStore } from "@/domains/playlist/stores/usePlaylist";
import { Playlist } from "@/domains/playlist/types/Playlist";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

export default function SideBar() {
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const router = useRouter();
  const userId = userSpotifyStore((state) => state.userId);

  const { playlistStore, setPlaylistsStore } = usePlaylistStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || !userId) return;

      try {
        const res = await authAxios.get("/api/playlist/getPlaylist");
        const data = res.data as Playlist[];
        const myPlaylist = data.filter((v) => v.owner.id === userId);
        setPlaylistsStore(myPlaylist);
      } catch (error) {
        console.error("사이드바 플레이리스트 로딩 실패:", error);
      }
    };

    fetchData();
  }, [isLoggedIn, userId, setPlaylistsStore]);

  return (
    <div className="fixed top-20 left-0 w-65 h-full bg-(--primary-blue) z-50 text-white">
      <div className="p-4">
        <RouterBox url="/">
          <FaHome size={20} className="mr-5" />
          <h2>홈</h2>
        </RouterBox>
        <RouterBox url="/genre">
          <FaMusic size={20} className="mr-5" />
          <h2>장르별 인기차트</h2>
        </RouterBox>
        {isLoggedIn && (
          <RouterBox url="/playlist">
            <FaListUl size={20} className="mr-5" />
            <h2>내 플레이리스트</h2>
          </RouterBox>
        )}
      </div>
      {isLoggedIn && (
        <>
          <div className="flex flex-col h-103 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent h-[calc(61%-72px)]">
            {playlistStore.length > 0 ? (
              playlistStore.map((playlist) => (
                <div
                  key={playlist.id}
                  className="cursor-pointer hover:bg-(--primary-blue-hover) p-2 rounded border-1 mb-4 ml-4 mr-4 flex-shrink-0"
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                >
                  <h2 className="truncate text-sm">{playlist.name}</h2>
                </div>
              ))
            ) : (
              <div className="text-gray-400">플레이리스트가 없습니다.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const RouterBox = ({ children, url }: { children: ReactNode; url: string }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center cursor-pointer hover:bg-(--primary-blue-hover) pt-4 pb-4 pl-2 pr-2 rounded"
      onClick={() => router.push(`${url}`)}
    >
      {children}
    </div>
  );
};
