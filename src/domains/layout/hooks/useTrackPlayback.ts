import { useEffect, useState } from "react";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import authAxios from "@/domains/common/lib/axios/authAxios";

interface UseTrackPlaybackProps {
  player: Spotify.Player | null;
  deviceId: string | null;
}

interface UseTrackPlaybackReturn {
  track: Spotify.Track | null;
  paused: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
  playTrack: (trackId: string) => Promise<void>;
  togglePlay: () => Promise<void>;
  changeVolume: (volume: number) => void;
}

export const useTrackPlayback = ({ player, deviceId }: UseTrackPlaybackProps): UseTrackPlaybackReturn => {
  const [track, setTrack] = useState<Spotify.Track | null>(null);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedTrackId } = usePlayerStore();

  const fetchAccessToken = async () => {
    try {
      const res = await authAxios.get("/api/getAccessToken");
      if (res.data.success && res.data.access_token) {
        return res.data.access_token;
      }
      throw new Error("Failed to get access token");
    } catch (error) {
      console.error("Error fetching access token:", error);
      setError("인증 토큰을 가져올 수 없습니다.");
      return null;
    }
  };

  const playTrack = async (trackId: string) => {
    if (!deviceId || !player) {
      console.error("Player or device not ready");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const accessToken = await fetchAccessToken();
      if (!accessToken) return;

      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [`spotify:track:${trackId}`],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Track started playing:", trackId);
    } catch (error) {
      console.error("Error playing track:", error);
      setError("트랙 재생에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (player) {
      try {
        setError(null);
        await player.togglePlay();
      } catch (error) {
        console.error("Error toggling play:", error);
        setError("재생/일시정지 전환 실패");
      }
    }
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  // 플레이어 상태 변경 리스너 설정
  useEffect(() => {
    if (!player) return;

    const handlePlayerStateChanged = (state: Spotify.PlaybackState) => {
      if (!state) return;
      setPaused(state.paused);
      setTrack(state.track_window.current_track);
    };

    player.addListener("player_state_changed", handlePlayerStateChanged);

    return () => {
      player.removeListener("player_state_changed", handlePlayerStateChanged);
    };
  }, [player]);

  // selectedTrackId가 변경될 때 트랙 재생
  useEffect(() => {
    if (selectedTrackId && deviceId && player) {
      playTrack(selectedTrackId);
    }
  }, [selectedTrackId, deviceId, player]);

  return {
    track,
    paused,
    volume,
    isLoading,
    error,
    playTrack,
    togglePlay,
    changeVolume,
  };
}; 