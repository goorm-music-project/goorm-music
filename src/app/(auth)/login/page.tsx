"use client";

export default function Login() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = "https://localhost:3000/callback";
    const scope = "user-read-email user-read-private";

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

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
