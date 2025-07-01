import Link from "next/link";

interface TrackInfoProps {
  artists: string[];
  artistsId: string[];
}

export default function TrackInfo({ artists, artistsId }: TrackInfoProps) {
  return (
    <p className="mb-4">
      {artists.map((artist, idx) => (
        <span key={artistsId[idx]}>
          <Link href={`/artist/${artistsId[idx]}`}>{artist}</Link>
          {idx < artists.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}
