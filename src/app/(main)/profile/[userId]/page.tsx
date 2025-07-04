"use client";
import { useState } from "react";
import { FaEdit, FaPlus, FaMusic, FaHeart, FaUsers } from "react-icons/fa";

export default function ProfilePage() {
  // 임시 더미 데이터
  const user = {
    avatar: null,
    name: "김뮤직",
    username: "musiclover2024",
    followers: 1234,
    following: 567,
    bio: "음악을 사랑하는 사람입니다. 다양한 장르의 음악을 즐겨 듣고 플레이리스트를 만드는 것을 좋아해요! 🎵",
    totalPlaylists: 12,
    totalLikedSongs: 89,
  };
  const followedPlaylists = [{ id: 1 }, { id: 2 }];
  const preferredGenres = [
    "K-Pop",
    "Hip Hop",
    "R&B",
    "Pop",
    "Jazz",
    "Electronic",
  ];
  const myPlaylists = [
    {
      id: 1,
      name: "내가 좋아하는 K-Pop",
      desc: "최신 K-Pop 히트곡들을 모아놨어요",
      count: 25,
    },
    {
      id: 2,
      name: "밤에 듣기 좋은 음악",
      desc: "조용한 밤에 어울리는 감성적인 곡들",
      count: 18,
    },
  ];
  const likedSongs = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: 200,
      image: null,
    },
    {
      id: 2,
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      duration: 141,
      image: null,
    },
    {
      id: 3,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      duration: 178,
      image: null,
    },
  ];

  const [tab, setTab] = useState<"playlists" | "liked" | "following">(
    "playlists"
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 pt-6 pb-8">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-900">내 프로필</h1>
          </div>

          {/* Profile Info */}
          <div className="flex items-start space-x-4 mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 font-bold select-none">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-3">@{user.username}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span>
                  <strong className="text-gray-900">
                    {user.followers.toLocaleString()}
                  </strong>{" "}
                  팔로워
                </span>
                <span>
                  <strong className="text-gray-900">
                    {user.following.toLocaleString()}
                  </strong>{" "}
                  팔로잉
                </span>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1 text-sm font-semibold flex items-center"
                onClick={() => alert("프로필 편집 모달!")}
              >
                <FaEdit className="h-4 w-4 mr-2" />
                프로필 편집
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-6 leading-relaxed">{user.bio}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {user.totalPlaylists}
              </div>
              <div className="text-sm text-gray-600">플레이리스트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {user.totalLikedSongs}
              </div>
              <div className="text-sm text-gray-600">좋아요한 곡</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {followedPlaylists.length}
              </div>
              <div className="text-sm text-gray-600">팔로우 중</div>
            </div>
          </div>

          {/* Preferred Genres */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">선호 장르</h3>
              <button
                className="text-blue-500 hover:text-blue-600 text-xs px-2 py-1 rounded"
                onClick={() => alert("장르 편집 모달!")}
              >
                편집
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredGenres.map((genre) => (
                <span
                  key={genre}
                  className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4">
        {/* Tabs */}
        <div className="grid w-full grid-cols-3 bg-gray-100 rounded-lg mb-6 overflow-hidden">
          <button
            onClick={() => setTab("playlists")}
            className={`py-2 text-sm flex justify-center items-center font-semibold transition ${
              tab === "playlists"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            <FaMusic className="h-4 w-4 mr-1" />
            플레이리스트
          </button>
          <button
            onClick={() => setTab("liked")}
            className={`py-2 text-sm flex justify-center items-center font-semibold transition ${
              tab === "liked"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            <FaHeart className="h-4 w-4 mr-1" />
            좋아요
          </button>
          <button
            onClick={() => setTab("following")}
            className={`py-2 text-sm flex justify-center items-center font-semibold transition ${
              tab === "following"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            <FaUsers className="h-4 w-4 mr-1" />
            팔로우
          </button>
        </div>

        {/* Tab Panels */}
        {tab === "playlists" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">
                내 플레이리스트
              </h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 text-sm font-semibold flex items-center">
                <FaPlus className="h-4 w-4 mr-1" />새 플레이리스트
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {myPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center bg-white rounded-lg p-4 shadow border"
                >
                  <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0 mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold">{playlist.name}</div>
                    <div className="text-xs text-gray-500">{playlist.desc}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {playlist.count}곡
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">• • •</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "liked" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">좋아요한 곡</h2>
              <p className="text-sm text-gray-600">{user.totalLikedSongs}곡</p>
            </div>
            <div className="space-y-3">
              {likedSongs.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="text-sm font-medium text-blue-400 w-6">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {track.title}
                    </h3>
                    <p className="text-gray-600 text-xs truncate">
                      {track.artist}
                    </p>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, "0")}
                  </div>
                  <button className="p-1 text-red-400 hover:text-red-500">
                    <FaHeart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <button className="border border-gray-200 rounded px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">
                더 보기
              </button>
            </div>
          </div>
        )}

        {tab === "following" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">
                팔로우한 플레이리스트
              </h2>
              <p className="text-sm text-gray-600">
                {followedPlaylists.length}개
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {followedPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center bg-white rounded-lg p-4 shadow border"
                >
                  <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0 mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold">
                      팔로우 플레이리스트 이름
                    </div>
                    <div className="text-xs text-gray-500">설명</div>
                    <div className="text-xs text-gray-400 mt-1">곡 수</div>
                  </div>
                  <div className="text-xs text-gray-400">• • •</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
