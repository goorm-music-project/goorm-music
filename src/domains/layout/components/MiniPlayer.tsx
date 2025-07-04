"use client";

import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";

export default function MiniPlayer() {
  const { selectedTrackId } = usePlayerSotre();

  if (!selectedTrackId) return null;

  return (
    <div
      className="fixed bottom-16 left-0 w-full z-50 bg-[#1f1f1f]"
      style={{
        pointerEvents: "none", // iframe 자체를 제외한 이벤트 막음
      }}
    >
      <iframe
        src={`https://open.spotify.com/embed/track/${selectedTrackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152" // 모바일용 작은 높이 고정
        allow="encrypted-media"
        className="pointer-events-auto" // iframe 내부는 클릭 가능
      />
    </div>
  );
}
