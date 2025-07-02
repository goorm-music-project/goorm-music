"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import TrackCard from "@/domains/common/components/TrackCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

type artistMoreTracksType = [
  {
    imageUrl: string;
    title: string;
    artists: string[];
    trackId: string;
  }
];

export default function ArtistMoreTracks({ artistId }: { artistId: string }) {
  const [tracks, setTracks] = useState<artistMoreTracksType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRouter();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch(`/api/artist/${artistId}/top-tracks`);
        if (!res.ok) throw new Error("아티스트 인기곡 불러오기 실패");
        const data = await res.json();
        setTracks(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchTracks();
    }
  }, [artistId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="mt-3 mb-3">이 아티스트의 인기곡들을 만나보세요.</h2>
      {error
        ? "인기곡 로드 중 오류 발생"
        : tracks && (
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              className="w-full"
            >
              {tracks.map((track) => (
                <SwiperSlide
                  key={track.imageUrl + track.title}
                  className="!w-[150px]"
                  onClick={() => route.push(`/track/${track.trackId}`)}
                >
                  <TrackCard
                    imageUrl={track.imageUrl}
                    name={track.title}
                    artists={track.artists}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
    </div>
  );
}
