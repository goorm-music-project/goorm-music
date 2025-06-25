"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function EditGenreModal({
  isOpen,
  onClose,
  initialGenres = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  initialGenres?: string[];
}) {
  const allGenres = [
    "팝",
    "록",
    "힙합",
    "재즈",
    "클래식",
    "EDM",
    "R&B",
    "발라드",
    "트로트",
    "인디",
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = () => {
    console.log("선호 장르 저장:", selectedGenres);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            선호 장르 편집
          </Dialog.Title>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* 본문: 장르 선택 */}
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {allGenres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-2 rounded border text-sm ${
                  selectedGenres.includes(genre)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 py-4 flex gap-3 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
