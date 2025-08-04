import SuggestLoginModal from "@/domains/common/components/SuggestLoginModal";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
import { Playlist } from "@/domains/playlist/types/Playlist";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useLoginModalStore } from "../stores/useLoginModalStore";

export default function NavPlaylist() {
  const { isLoggedIn, userId } = userSpotifyStore();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const router = useRouter();
  const { setShowLoginModal } = useLoginModalStore();

  const handleAddPlayListBtn = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      router.push("/playlist");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/playlist/getPlaylist");
        const data = await res.json();
        const myPlaylist = data.filter(
          (v: { owner: { id: string | null } }) => v.owner.id === userId
        );
        setPlaylists(myPlaylist);
      } catch (err) {
        console.log("nav 플레이리스트불러오기 오류", err);
      }
    };
    fetchData();
  }, [isLoggedIn, userId]);

  return (
    <div className="hidden w-full mt-2 h-[80vh] overflow-y-auto md:block ">
      <h3>플레이리스트 목록</h3>
      {!isLoggedIn || playlists.length === 0 ? (
        <div
          onClick={handleAddPlayListBtn}
          className="flex items-center justify-center mt-2 w-full h-10 border border-white cursor-pointer"
        >
          <FaPlus />
        </div>
      ) : (
        playlists.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-center mt-2 w-full h-10 border border-white cursor-pointer"
          >
            <Link href={`/playlist/${v.id}`}>{v.name}</Link>
          </div>
        ))
      )}

      <SuggestLoginModal />
    </div>
  );
}
