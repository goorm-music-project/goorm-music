/* eslint-disable @typescript-eslint/no-explicit-any */
import appAxios from "@/domains/common/lib/axios/appAxios";
import PlayBar from "@/domains/main/components/PlayBar";
import { PlaylistItem } from "@/domains/playlist/types/Playlist";
import React, { useEffect, useState } from "react";

interface Props {
  artistId: string;
}

export default function ArtistTopTracks({ artistId }: Props) {
  const [topTracks, setTopTracks] = useState<PlaylistItem[] | null>(null);

  const mapTrackData = (tracks: any[]): PlaylistItem[] => {
    return tracks.map((track) => ({
      track: {
        id: track.id,
        name: track.name,
        uri: track.uri,
        album: {
          name: track.album.name,
          images: track.album.images,
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
        const res = await appAxios.get(
          `/api/artist/${artistId}/top-tracks?mode=allData`
        );
        const json = await res.data;
        const data = mapTrackData(json);
        setTopTracks(data);
      } catch (err) {
        console.log("인기 음악 불러오기 오류", err);
      }
    };
    fetchData();
  }, [artistId]);

  return (
    <div className="my-4">
      <h1>아티스트의 인기 음악을 들어보세요.</h1>
      <div>{topTracks && <PlayBar tracks={topTracks} />}</div>
    </div>
  );
}
