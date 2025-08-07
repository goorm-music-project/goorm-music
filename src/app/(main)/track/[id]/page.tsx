"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TrackActionBtns from "@/domains/track/components/TrackActionBtns";
import TrackInfo from "@/domains/track/components/TrackInfo";
import ArtistMoreTracks from "@/domains/track/components/ArtistMoreTracks";
import appAxios from "@/domains/common/lib/axios/appAxios";

interface TrackDetail {
  artists: string[]; // 아티스트 이름
  artistsId: string[]; // 아티스트 고유 id
  title: string; // 노래 제목
  lyrics: string | null; // 가사
  imageUrl: string; // 앨범 커버 이미지 URL
}

export default function TrackDetailPage() {
  const { id } = useParams();
  const trackId = String(id);
  const [track, setTrack] = useState<TrackDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await appAxios.get(`/api/track/${trackId}`);
        console.log(res);
        const data = res.data as TrackDetail;
        setTrack(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다");
        }
      } finally {
        setLoading(false);
      }
    };

    if (trackId) {
      fetchTrack();
    }
  }, [trackId]);

  if (loading) return <LoadingSpinner />;
  if (error || !track) return <div>오류 발생</div>;

  return (
    <div>
      <div className="flex flex-col items-center">
        <Image src={track.imageUrl} alt="곡 사진" width={300} height={300} />
        <TrackActionBtns trackId={trackId} />
        <TrackInfo
          artists={track.artists}
          artistsId={track.artistsId}
          title={track.title}
        />
      </div>
      <ArtistMoreTracks artistId={track.artistsId[0]} />
    </div>
  );
}
