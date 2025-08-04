"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import TrackCard from "@/domains/common/components/TrackCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { usePlayerSotre } from "@/domains/common/stores/usePlayerStore";
import appAxios from "@/domains/common/lib/axios/appAxios";
import SwiperArrow from "@/domains/common/components/SwiperArrow";

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
  const [error, setError] = useState<Error | null>(null);
  const route = useRouter();
  const setSelectedTrackId = usePlayerSotre(
    (state) => state.setSelectedTrackId
  );

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await appAxios.get(`/api/artist/${artistId}/top-tracks`);
        const data = res.data as artistMoreTracksType;
        setTracks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 오류가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchTracks();
    }
  }, [artistId]);

  const handleTrackCardClick = (trackId: string) => {
    setSelectedTrackId(trackId);
    route.push(`/track/${trackId}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="mt-3 mb-3">이 아티스트의 인기곡들을 만나보세요.</h2>
      <div className="relative">
        <div className="w-[90%] ml-[5%]">
          {error ? (
            <div className="text-red-500 font-semibold">
              인기곡 로드 중 오류 발생: {error.message}
            </div>
          ) : (
            tracks && (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                className="w-full"
                navigation={{
                  prevEl: ".artistTrack-prev",
                  nextEl: ".artistTrack-next",
                }}
                modules={[Navigation]}
              >
                {tracks.map((track) => (
                  <SwiperSlide
                    key={track.imageUrl + track.title}
                    className="!w-[150px]"
                  >
                    <TrackCard
                      imageUrl={track.imageUrl}
                      name={track.title}
                      artists={track.artists}
                      onClick={() => handleTrackCardClick(track.trackId)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          )}
        </div>
        <SwiperArrow
          classPrev="artistTrack-prev"
          classNext="artistTrack-next"
        />
      </div>
    </div>
  );
}
