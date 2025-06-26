"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

const ALL_GENRES = [
  "K-Pop",
  "Hip Hop",
  "R&B",
  "Pop",
  "Jazz",
  "Electronic",
  "Rock",
  "Ballad",
  "Acoustic",
  "Newage",
  "Classic",
  "Metal",
];

export default function EditGenreModal({
  isOpen,
  onClose,
  selectedGenres,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedGenres: string[];
  onSave: (updatedGenres: string[]) => void;
}) {
  const [localGenres, setLocalGenres] = useState<string[]>(selectedGenres);

  const toggleGenre = (genre: string) => {
    setLocalGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = () => {
    onSave(localGenres);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-lg">
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

        <div className="px-6 py-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {ALL_GENRES.map((genre) => (
              <button
                key={genre}
                className={`px-3 py-1 rounded text-sm border ${
                  localGenres.includes(genre)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3">
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
