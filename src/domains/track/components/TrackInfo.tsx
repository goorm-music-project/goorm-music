import Link from "next/link";

interface TrackInfoProps {
  title: string;
  artists: string[];
  artistsId: string[];
}

export default function TrackInfo({ title, artists, artistsId }: TrackInfoProps) {
  return (
    <>
      <h1 className="mt-4 text-center">{title}</h1>
      <p className="mb-4">
        {artists.map((artist, idx) => (
          <span key={artistsId[idx]}>
            <Link href={`/artist/${artistsId[idx]}`}>{artist}</Link>
            {idx < artists.length - 1 && ", "}
          </span>
        ))}
      </p>
    </>
  );
}
