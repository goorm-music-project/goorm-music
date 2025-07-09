import { useState } from "react";
import { Playlist } from "../types/Profile";
import { useRouter } from "next/navigation";

interface Props {
  playlists: Playlist[];
  onEdit: (playlistId: string, name: string, description: string) => void;
  onDelete: (playlistId: string) => void;
  onTogglePublic: (playlistId: string, isPublic: boolean) => void;
}

const PlaylistList = ({
  playlists,
  onEdit,
  onDelete,
  onTogglePublic,
}: Props) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { playlist: Playlist }>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const router = useRouter();

  const handleGoDetail = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  const openEditModal = (playlist: Playlist) => {
    setEditName(playlist.name);
    setEditDesc(playlist.description);
    setModal({ playlist });
    setOpenMenu(null);
  };

  const closeModal = () => setModal(null);

  const handleEditSubmit = () => {
    if (!modal) return;
    onEdit(modal.playlist.id, editName, editDesc);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex items-center bg-white rounded-xl p-2 sm:p-4 shadow border gap-2 sm:gap-4 relative"
        >
          {/* 앨범 커버 */}
          {playlist.images && playlist.images[0]?.url ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer"
              onClick={() => handleGoDetail(playlist.id)}
            />
          ) : (
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-200 flex-shrink-0 cursor-pointer"
              onClick={() => handleGoDetail(playlist.id)}
            />
          )}

          {/* 텍스트 감싸는 div에 flex-1, basis-0, min-w-0, max-w-full */}
          <div
            className="flex-1 basis-0 min-w-0 max-w-full cursor-pointer"
            onClick={() => handleGoDetail(playlist.id)}
          >
            <div className="font-bold text-sm sm:text-base mb-1 truncate">
              {playlist.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
              {playlist.description}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate">
              {playlist.trackCount}곡
              <span
                className={`ml-2 px-2 py-1 rounded text-xs sm:text-sm ${
                  playlist.isPublic
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {playlist.isPublic ? "공개" : "비공개"}
              </span>
            </div>
          </div>

          {/* 햄버거(⋮) 버튼 */}
          <button
            className="ml-1 sm:ml-2 text-xl px-1 py-1 rounded hover:bg-gray-100 relative flex-shrink-0"
            onClick={() =>
              setOpenMenu(openMenu === playlist.id ? null : playlist.id)
            }
          >
            &#8942;
          </button>
          {/* 드롭다운 메뉴 */}
          {openMenu === playlist.id && (
            <div className="absolute right-3 top-14 z-10 bg-white border rounded shadow px-2 py-2 w-36 flex flex-col">
              <button
                className="text-left px-2 py-1 hover:bg-gray-100"
                onClick={() => openEditModal(playlist)}
              >
                제목/설명 수정
              </button>
              <button
                className="text-left px-2 py-1 hover:bg-red-100 text-red-700"
                onClick={() => onDelete(playlist.id)}
              >
                삭제
              </button>
              <button
                className="text-left px-2 py-1 hover:bg-blue-100"
                onClick={() => onTogglePublic(playlist.id, !playlist.isPublic)}
              >
                {playlist.isPublic ? "비공개로 전환" : "공개로 전환"}
              </button>
            </div>
          )}
        </div>
      ))}
      {/* 수정 모달 */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-[320px] flex flex-col gap-3">
            <div className="font-bold text-lg mb-2">플레이리스트 수정</div>
            <input
              className="border p-2 rounded mb-2"
              placeholder="이름"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              className="border p-2 rounded mb-2"
              placeholder="설명"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-blue-500 text-white rounded px-3 py-2"
                onClick={handleEditSubmit}
              >
                저장
              </button>
              <button
                className="flex-1 bg-gray-200 rounded px-3 py-2"
                onClick={closeModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistList;
