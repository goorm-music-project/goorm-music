"use client";

import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

type PlaylistCardMyProps = {
  id: string;
  name: string;
  trackCount: number;
  isPublic: boolean;
};

export default function PlaylistCardMy({
  id,
  name,
  trackCount,
  isPublic,
}: PlaylistCardMyProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [publicState, setPublicState] = useState(isPublic);
  const [playlistName, setPlaylistName] = useState(name);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleVisibilityChange = () => {
    setPublicState(!publicState);
    setOpenMenu(false);
    // TODO: API 요청으로 상태 업데이트
  };

  const handleDelete = () => {
    setOpenMenu(false);
    alert(`플레이리스트 "${playlistName}" 삭제!`);
    // TODO: 삭제 API 요청
  };

  const handleRename = () => {
    const newName = prompt("새 이름을 입력하세요", playlistName);
    if (newName && newName !== playlistName) {
      setPlaylistName(newName);
      // TODO: 이름 변경 API 요청
    }
    setOpenMenu(false);
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{playlistName}</h3>
        <p className="text-sm text-gray-500">
          {trackCount}곡 · {publicState ? "공개" : "비공개"}
        </p>
      </div>

      <div className="relative">
        <button onClick={toggleMenu}>
          <FaEllipsisV className="text-gray-600" />
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded z-10">
            <button
              onClick={handleVisibilityChange}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {publicState ? "비공개로 전환" : "공개로 전환"}
            </button>
            <button
              onClick={handleRename}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              이름 수정
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
