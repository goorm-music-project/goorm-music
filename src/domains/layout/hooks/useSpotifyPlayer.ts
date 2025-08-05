import { useEffect, useState, useRef } from "react";
import authAxios from "@/domains/common/lib/axios/authAxios";

interface UseSpotifyPlayerReturn {
  player: Spotify.Player | null;
  deviceId: string | null;
  error: string | null;
  isLoading: boolean;
}

export const useSpotifyPlayer = (): UseSpotifyPlayerReturn => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const playerRef = useRef<Spotify.Player | null>(null);

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

  useEffect(() => {
    let playerInstance: Spotify.Player;
    
    const loadSpotifyPlayer = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    const initializePlayer = (accessToken: string) => {
      try {
        playerInstance = new Spotify.Player({
          name: "Goorm Music Mini Player",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: 0.5,
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

  return { player, deviceId, error, isLoading };
}; 