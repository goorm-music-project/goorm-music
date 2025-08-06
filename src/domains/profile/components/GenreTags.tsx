import { useState, useEffect } from "react";
import { GenreTagsProps } from "@/domains/profile/types/Profile";

const GENRES = [
  "발라드",
  "팝",
  "어쿠스틱",
  "아이돌",
  "락",
  "알앤비",
  "일렉트로닉",
  "재즈",
  "힙합",
  "인디",
  "성인가요",
  "메탈",
  "뉴에이지",
  "클래식",
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

export default function GenreTags({
  userId,
  genres,
  onSave,
  showEditButton,
}: GenreTagsProps) {
  const [selected, setSelected] = useState<string[]>(genres || []);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelected(genres || []);
  }, [genres]);

  const toggleGenre = (genre: string) => {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
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
      <div className="flex items-center gap-2 flex-wrap">
        {selected.length > 0 &&
          selected.map((genre) => (
            <span
              key={genre}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}

        {showEditButton && (
          <button
            className="ml-2 text-xs text-blue-600 underline"
            onClick={() => setEditing(true)}
          >
            편집
          </button>
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
            <div className="font-semibold mb-3 text-center text-lg">
              선호 장르 선택
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`
                    flex items-center justify-center
                    h-12 min-w-[90px] px-2 py-1
                    rounded-full border text-base font-medium
                    transition
                    ${
                      selected.includes(genre)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-blue-500 border-blue-400"
                    }
                  `}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="px-3 py-1 text-gray-500 hover:text-black"
                onClick={() => {
                  setSelected(genres || []);
                  setEditing(false);
                }}
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
