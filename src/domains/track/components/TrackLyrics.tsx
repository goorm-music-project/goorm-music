import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import appAxios from "@/domains/common/lib/axios/appAxios";
import { useEffect, useState } from "react";

interface TrackLyricsProps {
  title: string;
  artist: string;
}

export default function TrackLyrics({ title, artist }: TrackLyricsProps) {
  const [lyric, setLyric] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      try {
        const res = await appAxios.post("/api/lyric", { title, artist });
        setLyric(res.data.lyrics);
      } catch (err) {
        console.error("가사 조회 실패:", err);
        setLyric("가사를 지원하지 않는 곡입니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchLyrics();
  }, []);

  return (
    <div className="rounded border p-5 h-75 overflow-y-auto w-full max-w-md text-sm leading-relaxed relative">
      {loading ? (
        <LoadingSpinner />
      ) : lyric ? (
        <pre className="whitespace-pre-wrap">{lyric}</pre>
      ) : (
        <div className="text-gray-500">가사를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}
