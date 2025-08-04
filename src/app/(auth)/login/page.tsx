"use client";

import Image from "next/image";

export default function Login() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
    const scope =
      "user-read-email user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read user-library-modify streaming user-read-playback-state user-modify-playback-state";

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-8 px-4">
      <Image src="/goorm_logo_blue.png" alt="로고" width={320} height={320} />
      <button
        className="flex items-center border border-gray-800 px-8 py-4 rounded hover:bg-gray-100"
        onClick={handleLogin}
      >
        <Image
          src="/spotify_logo.png"
          alt="spotify logo"
          className="mr-4"
          width={40}
          height={40}
        />
        <span className="text-lg font-semibold">spotify로 로그인하기</span>
      </button>
    </div>
  );
}
