import Image from "next/image";

type PlaylistCardProps = {
  id: string;
  name: string;
  image: string;
  trackCount: number;
};

export default function PlaylistCard({
  name,
  image,
  trackCount,
}: PlaylistCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 cursor-pointer transition">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-md mb-2 w-full object-cover aspect-square"
      />
      <h3 className="text-sm font-medium truncate">{name}</h3>
      <p className="text-xs text-gray-500">{trackCount}곡</p>
    </div>
  );
}
