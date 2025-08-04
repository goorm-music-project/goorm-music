"use client";

import authAxios from "@/domains/common/lib/axios/authAxios";
import { usePlayerStore } from "@/domains/common/stores/usePlayerStore";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaPause, FaVolumeUp, FaTimes } from "react-icons/fa";

export default function SdkMiniPlayer() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [paused, setPaused] = useState(true);
  const [track, setTrack] = useState<Spotify.Track | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedTrackId, setSelectedTrackId } = usePlayerStore();
  const playerRef = useRef<Spotify.Player | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    let playerInstance: Spotify.Player;
    const loadSpotifyPlayer = async () => {
      try {
        const accessToken = await fetchAccessToken();
        if (!accessToken) return;

        // 기존 스크립트가 있는지 확인
        if (document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
          // 이미 로드된 경우
          if (window.Spotify) {
            initializePlayer(accessToken);
          } else {
            // 스크립트는 있지만 SDK가 아직 로드되지 않은 경우
            window.onSpotifyWebPlaybackSDKReady = () => {
              initializePlayer(accessToken);
            };
          }
        } else {
          // 스크립트 로드
          const script = document.createElement("script");
          script.src = "https://sdk.scdn.co/spotify-player.js";
          script.async = true;
          
          window.onSpotifyWebPlaybackSDKReady = () => {
            initializePlayer(accessToken);
          };

          document.head.appendChild(script);
        }
      } catch (error) {
        console.error("Error loading Spotify player:", error);
        setError("Spotify 플레이어를 로드할 수 없습니다.");
      }
    };

    const initializePlayer = (accessToken: string) => {
      try {
        playerInstance = new Spotify.Player({
          name: "Goorm Music Mini Player",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: volume,
        });

        playerInstance.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);
          setError(null);
        });

        playerInstance.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
          setDeviceId(null);
        });

        playerInstance.addListener("player_state_changed", (state) => {
          if (!state) return;
          setPaused(state.paused);
          setTrack(state.track_window.current_track);
        });

        playerInstance.addListener("initialization_error", ({ message }) => {
          console.error("Initialization error:", message);
          setError("플레이어 초기화 오류");
        });

        playerInstance.addListener("authentication_error", ({ message }) => {
          console.error("Authentication error:", message);
          setError("인증 오류");
        });

        playerInstance.addListener("account_error", ({ message }) => {
          console.error("Account error:", message);
          setError("계정 오류");
        });

        playerInstance.addListener("playback_error", ({ message }) => {
          console.error("Playback error:", message);
          setError("재생 오류");
        });

        playerInstance.connect();
        setPlayer(playerInstance);
        playerRef.current = playerInstance;
      } catch (error) {
        console.error("Error initializing player:", error);
        setError("플레이어 초기화 실패");
      }
    };

    loadSpotifyPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, []);

  // selectedTrackId가 변경될 때 트랙 재생
  useEffect(() => {
    if (selectedTrackId && deviceId && player) {
      playTrack(selectedTrackId);
    }
  }, [selectedTrackId, deviceId, player]);

  const togglePlay = async () => {
    if (player) {
      try {
        await player.togglePlay();
      } catch (error) {
        console.error("Error toggling play:", error);
        setError("재생/일시정지 전환 실패");
      }
    }
  };

  const changeVolume = (volume: number) => {
    setVolume(volume);
    if (player) {
      player.setVolume(volume);
    }
  };

  const clearSelectedTrack = () => {
    setSelectedTrackId("");
  };

  // 에러가 있거나 로딩 중이거나 트랙이 없으면 렌더링하지 않음
  if (error) {
    return (
      <div className="fixed bottom-11 md:bottom-0 left-0 w-full z-50 bg-red-600 text-white p-3 text-center text-sm font-medium">
        {error}
      </div>
    );
  }

  if (!track && !selectedTrackId) {
    return null;
  }

  return (
    <div className="fixed bottom-11 md:bottom-0 left-0 w-full z-51 bg-gray-900 border-t border-gray-700 shadow-lg h-20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* 트랙 정보 섹션 */}
        <div
          className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer rounded-md transition"
          onClick={() => track && router.push(`/track/${track.id}`)}
        >
          {track && (
            <>
              {/* 앨범 아트 */}
              <div className="flex-shrink-0">
                <Image
                  src={track.album.images[0]?.url || "/goorm_logo_blue.png"}
                  alt={track.name}
                  width={48}
                  height={48}
                  className="rounded-md shadow-md"
                />
              </div>
              {/* 트랙 정보 */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  {track.name}
                </span>
                <span className="text-xs text-gray-300 truncate">
                  {track.artists.map((a: any) => a.name).join(", ")}
                </span>
              </div>
            </>
          )}
          {!track && selectedTrackId && (
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                <span className="text-white text-lg">🎵</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-white">
                  {isLoading ? "재생 중..." : "트랙 로딩 중..."}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* 컨트롤 섹션 */}
        <div className="flex items-center space-x-4">
          {/* 재생/일시정지 버튼 */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-10 h-10 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : paused ? (
              <FaPlay className="w-4 h-4 ml-0.5" />
            ) : (
              <FaPause className="w-4 h-4" />
            )}
          </button>
          {/* 볼륨 슬라이더 */}
          <div className="flex items-center space-x-2">
            <FaVolumeUp className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
