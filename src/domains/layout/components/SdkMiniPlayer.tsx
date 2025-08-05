"use client";

import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import { useTrackPlayback } from "../hooks/useTrackPlayback";
import TrackInfo from "./TrackInfo";
import PlaybackControls from "./PlaybackControls";
import VolumeControl from "./VolumeControl";
import ErrorDisplay from "./ErrorDisplay";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import { useWindowWidth } from "@/domains/common/hooks/useWindowWidth";

export default function SdkMiniPlayer() {
  const {
    player,
    deviceId,
    error: playerError,
    isLoading: playerLoading,
  } = useSpotifyPlayer();
  const { selectedTrackId } = usePlayerStore();
  const displayWidth = useWindowWidth();

  const {
    track,
    paused,
    volume,
    isLoading: playbackLoading,
    error: playbackError,
    togglePlay,
    changeVolume,
  } = useTrackPlayback({ player, deviceId });

  const error = playerError || playbackError;
  const isLoading = playerLoading || playbackLoading;

  // 에러가 있으면 에러 표시
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // 트랙이 없고 선택된 트랙도 없으면 렌더링하지 않음
  if (!track && !selectedTrackId) {
    return null;
  }

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 w-full z-51 bg-gray-900 border-t border-gray-700 h-20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* 트랙 정보 섹션 */}
        <TrackInfo track={track} isLoading={isLoading} />

        {/* 컨트롤 섹션 */}
        <div className="flex items-center space-x-4">
          {/* 재생/일시정지 버튼 */}
          <PlaybackControls
            paused={paused}
            isLoading={isLoading}
            onTogglePlay={togglePlay}
          />

          {/* 볼륨 슬라이더 */}
          {displayWidth && displayWidth >= 768 && (
            <VolumeControl volume={volume} onVolumeChange={changeVolume} />
          )}
        </div>
      </div>
    </div>
  );
}
