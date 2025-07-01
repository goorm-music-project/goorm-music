"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import Link from "next/link";
import TrackActionBtns from "@/domains/track/components/TrackActionBtns";
import TrackInfo from "@/domains/track/components/TrackInfo";
import TrackLyrics from "@/domains/track/components/TrackLyrics";

interface TrackDetail {
  artists: string[]; // 아티스트 이름
  artistsId: string[]; // 아티스트 고유 id
  title: string; // 노래 제목
  lyrics: string | null; // 가사
  imageUrl: string; // 앨범 커버 이미지 URL
}

export default function TrackDetailPage() {
  const { id } = useParams();

  const [track, setTrack] = useState<TrackDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(`/api/track/${id}`);
        if (!res.ok) throw new Error("트랙 상세 정보 불러오기 실패");
        const data = await res.json();
        setTrack(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrack();
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !track) return <div>오류 발생: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <Image src={track.imageUrl} alt="곡 사진" width={300} height={300} />
      <TrackActionBtns />
      <h1 className="mt-4">{track.title}</h1>
      <TrackInfo artists={track.artists} artistsId={track.artistsId} />
      <TrackLyrics lyrics={track.lyrics} />
    </div>
  );
}
