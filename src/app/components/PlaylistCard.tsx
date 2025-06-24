import Link from "next/link";

type PlaylistCardProps = {
  id: string;
  name: string;
  description?: string;
  owner?: string;
  trackCount?: number;
};

export default function PlaylistCard({
  id,
  name,
  description,
  owner,
  trackCount,
}: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${id}`}>
      <div className="bg-gray-100 rounded-lg p-4 w-full shadow-sm hover:bg-gray-200 transition">
        <h3 className="text-lg font-semibold">{name}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          {owner && <p>by {owner}</p>}
          {trackCount !== undefined && <p>{trackCount}곡</p>}
        </div>
      </div>
    </Link>
  );
}
