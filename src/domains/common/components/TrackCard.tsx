import Image from "next/image";

interface TrackCardProps {
  imageUrl: string;
  name: string;
  artists?: string[];
  onClick?: () => void;
}

export default function TrackCard({
  imageUrl,
  name,
  artists,
  onClick,
}: TrackCardProps) {
  return (
    <div
      className="w-[150px] h-[150px] cursor-pointer relative"
      onClick={onClick}
    >
      <Image src={imageUrl} alt={name} fill />
      <p className="truncate my-1">{name}</p>
      <p className="truncate">{artists?.join(", ")}</p>
    </div>
  );
}
