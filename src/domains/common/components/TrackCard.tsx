import Image from "next/image";

interface TrackCardProps {
  imageUrl: string;
  name: string;
  artists: string[];
}

export default function TrackCard({ imageUrl, name, artists }: TrackCardProps) {
  return (
    <div>
      <Image src={imageUrl} alt={name} width={150} height={150} />
      <p className="truncate my-1">{name}</p>
      <p className="truncate">{artists.join(", ")}</p>
    </div>
  );
}
