/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AlbumDetail {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { id: string; name: string }[];
  tracks: PlaylistItem[];
}

export default function Page() {
  const params = useParams();
  const albumId = params.id as string;
  const [albumData, setAlbumData] = useState<AlbumDetail>();
  const [isLoading, setIsLoading] = useState(false);

  const mapTrackData = (
    tracks: any[],
    albumName: string,
    albumImages: { url: string }[]
  ): PlaylistItem[] => {
    return tracks.map((track) => ({
      track: {
        id: track.id,
        name: track.name,
        uri: track.uri,
        album: {
          name: albumName,
          images: albumImages,
        },
        artists: track.artists.map((artist: { name: string }) => ({
          name: artist.name,
        })),
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await appAxios.get(`/api/album/${albumId}`);
        const data = await res.data;

        setAlbumData({
          ...data,
          tracks: mapTrackData(data.tracks.items, data.name, data.images),
        });
      } catch (err) {
        console.log("앨범 목록 출력 오류", err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [albumId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="">
        {albumData && (
          <>
            <div className="flex flex-col gap-2 mb-4 items-center">
              <Image
                src={albumData.images[0].url}
                alt={albumData.name}
                width={150}
                height={150}
              />
              <h2 className="truncate">{albumData.name}</h2>
              <p className="truncate">
                <Link href={`/artist/${albumData.artists[0].id}`}>
                  {albumData.artists[0].name}
                </Link>
              </p>
            </div>
            <div>
              <h1>앨범 수록곡을 확인해보세요.</h1>
              {<PlayBar tracks={albumData.tracks} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
