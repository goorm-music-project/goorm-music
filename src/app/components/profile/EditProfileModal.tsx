"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
  initialName,
  initialBio,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialBio?: string;
}) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio || "");

  const handleSave = () => {
    console.log("저장:", name, bio);
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
        <div className="flex items-center justify-between px-6 py-4 ">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            프로필 편집
          </Dialog.Title>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* 본문 폼 */}
        <div className="px-6 py-4 space-y-6">
          {/* 프로필 사진 자리 */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              {name.charAt(0)}
            </div>
            <button
              type="button"
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              사진 변경
            </button>
          </div>

          {/* 닉네임 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50"
              placeholder="닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 자기소개 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              소개
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 min-h-[100px]"
              placeholder="자기소개"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        {/* 하단 버튼 */}
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
