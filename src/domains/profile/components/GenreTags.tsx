import { useState } from "react";
import { GenreTagsProps } from "@/domains/profile/types/Profile";

const GENRES = [
  "Pop",
  "K-Pop",
  "Rock",
  "Hip-hop",
  "Indie",
  "Jazz",
  "EDM",
  "R&B",
  "Ballad",
  "Folk",
  "Classical",
  "Metal",
];

async function patchUserGenres(userId: string, genres: string[]) {
  const res = await fetch("/api/userData", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, genres }),
  });
  if (!res.ok) throw new Error("장르 저장 실패");
  return res.json();
}

export default function GenreTags({ userId, genres, onSave }: GenreTagsProps) {
  const [selected, setSelected] = useState<string[]>(genres || []);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelected((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 5
        ? [...prev, genre]
        : prev
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await patchUserGenres(userId, selected);
      if (onSave) onSave(selected);
      setEditing(false);
    } catch {
      alert("장르 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 현재 선택된 장르 표시 */}
      <div className="flex items-center gap-2 flex-wrap">
        {selected.length === 0 && (
          <span className="text-gray-400">선호 장르 없음</span>
        )}
        {selected.map((genre) => (
          <span
            key={genre}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
          >
            {genre}
          </span>
        ))}
        <button
          className="ml-2 text-xs text-blue-600 underline"
          onClick={() => setEditing(true)}
        >
          편집
        </button>
      </div>

      {/* 모달 UI */}
      {editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
            <div className="font-semibold mb-3">선호 장르 선택 (최대 5개)</div>
            <div className="grid grid-cols-2 gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={`px-3 py-1 rounded-full border ${
                    selected.includes(genre)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                  onClick={() => toggleGenre(genre)}
                  type="button"
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="px-3 py-1 text-gray-500 hover:text-black"
                onClick={() => setEditing(false)}
                disabled={loading}
              >
                취소
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
