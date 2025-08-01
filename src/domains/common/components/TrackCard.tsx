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
    <div className=" cursor-pointer" onClick={onClick}>
      <Image src={imageUrl} alt={name} width={150} height={150} sizes="150px" />
      <p className="truncate my-1">{name}</p>
      <p className="truncate">{artists?.join(", ")}</p>
    </div>
  );
}
