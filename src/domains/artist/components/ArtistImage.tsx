import { ArtistInfo } from "@/app/(main)/artist/[id]/page";
import appAxios from "@/domains/common/lib/axios/appAxios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  artistId: string;
}

export default function ArtistImage({ artistId }: Props) {
  const [artistData, setArtistData] = useState<ArtistInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appAxios.get(`/api/artist/${artistId}/artist-info`);
        const data = await res.data;
        setArtistData(data);
      } catch (err) {
        console.log("아티스트 정보 불러오기 오류", err);
      }
    };

    fetchData();
  }, [artistId]);

  return (
    <div className="h-[350px] relative">
      {artistData && (
        <>
          <div
            className={`h-[300px] bg-no-repeat bg-cover`}
            style={{ backgroundImage: `url(${artistData.images[0].url})` }}
          ></div>
          <div className="flex gap-2 absolute left-10 bottom-0">
            <Image
              src={artistData.images[1].url || artistData.images[0].url}
              alt={artistData.name}
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="place-content-end">
              <h2>{artistData.name}</h2>
              <p>{artistData.followers.total} 명</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
