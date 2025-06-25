"use client";

import BlueBackgroundBtn from "@/app/components/BlueBackgroundBtn";
import GenreToggleBtn from "@/app/components/GenreToggleBtn";
import Image from "next/image";
import { useState } from "react";

export default function SelectGenre() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const genreList = [
    "발라드",
    "팝",
    "어쿠스틱",
    "아이돌",
    "락",
    "알앤비",
    "일렉트로닉",
    "재즈",
    "힙합",
    "인디",
    "성인가요",
    "매탈",
    "뉴에이지",
    "클래식",
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSignUp = () => {};

  return (
    <div className="flex flex-col gap-2 items-center">
      <Image src="/goorm_logo_blue.png" alt="로고" width={300} height={300} />
      <h1 className="mb-5">어떤 음악을 주로 들으세요?</h1>
      <div className="grid grid-cols-3 gap-5">
        {genreList.map((genre) => (
          <GenreToggleBtn
            key={genre}
            selected={selectedGenres.includes(genre)}
            onToggle={handleGenreToggle}
          >
            {genre}
          </GenreToggleBtn>
        ))}
      </div>
      <BlueBackgroundBtn onClick={handleSignUp} className="w-85 mt-10">가입하기</BlueBackgroundBtn>
    </div>
  );
}
