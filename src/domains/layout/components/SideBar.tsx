"use client";

import authAxios from "@/domains/common/lib/axios/authAxios";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

type PlayListType = {
  id: string;
  name: string;
  owner: {
    id: string;
  };
};

export default function SideBar() {
  const [playList, setPlayList] = useState<PlayListType[]>([]);
  const isLoggedIn = userSpotifyStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authAxios.get("/api/playlist/getPlaylist");
      const data = (await res.data) as PlayListType[];
      setPlayList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="fixed top-25 left-0 w-65 h-full bg-(--primary-blue) z-50 p-4 text-white">
      <RouterBox url="/">
        <FaHome size={30} className="mr-5" />
        <h1>홈</h1>
      </RouterBox>
      <RouterBox url="/genre">
        <FaMusic size={30} className="mr-5" />
        <h1>장르별 인기차트</h1>
      </RouterBox>
      {isLoggedIn && (
        <>
          <RouterBox url="/playlist">
            <FaListUl size={30} className="mr-5" />
            <h1>내 플레이리스트</h1>
          </RouterBox>
          <div className="flex flex-col">
            {playList.length > 0 ? (
              playList.map((playlist) => (
                <div
                  key={playlist.id}
                  className="cursor-pointer hover:bg-(--primary-blue-hover) p-2 rounded border-1 mb-4"
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                >
                  <h2>{playlist.name}</h2>
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
