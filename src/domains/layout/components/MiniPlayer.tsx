"use client";

import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";

export default function MiniPlayer() {
  const { selectedTrackId } = usePlayerSotre();

  if (!selectedTrackId) return null;

  return (
    <div className="fixed bottom-11 md:bottom-0 left-0 w-full z-50 md:z-51 bg-[#1f1f1f]">
      <iframe
        src={`https://open.spotify.com/embed/track/${selectedTrackId}?utm_source=generator&theme=0`}
        width="100%"
        height="100"
        allow="encrypted-media"
      />
    </div>
  );
}
