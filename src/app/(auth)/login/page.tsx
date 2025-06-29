"use client";

export default function Login() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://127.0.0.1:3000/callback";
    const scope =
      "user-read-email user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read user-library-modify";

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col items-center">
      <img src="/goorm_logo_blue.png" alt="로고" className="w-80 mt-10" />
      <button
        className="flex items-center border border-gray-800 px-8 py-4 rounded hover:bg-gray-100"
        onClick={handleLogin}
      >
        <img src="/spotify_logo.png" alt="spotify logo" className="w-10 mr-4" />{" "}
        spotify로 로그인하기
      </button>
    </div>
  );
}
