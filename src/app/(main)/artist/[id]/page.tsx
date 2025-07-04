"use client";
import ArtistAlbums from "@/domains/artist/components/ArtistAlbums";
import ArtistImage from "@/domains/artist/components/ArtistImage";
import ArtistTopTracks from "@/domains/artist/components/ArtistTopTracks";
import { useParams } from "next/navigation";

export interface ArtistInfo {
  name: string;
  followers: {
    total: number;
  };
  images: { url: string }[];
}

export default function Page() {
  const params = useParams();
  const artistId = params.id as string;

  return (
    <div>
      <ArtistImage artistId={artistId} />
      <ArtistTopTracks artistId={artistId} />
      <ArtistAlbums artistId={artistId} />
    </div>
  );
}
