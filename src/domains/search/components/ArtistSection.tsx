import TrackCard from "@/domains/common/components/TrackCard";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  items: Array<{
    id: string;
    name: string;
    images: { url: string }[];
  }>;
}

export default function ArtistSection({ data }: { data: Props }) {
  const router = useRouter();
  return (
    <div className="h-[20vh] overflow-y-auto">
      {data.items.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        data?.items
          ?.slice(0, 1)
          .map((item) => (
            <TrackCard
              key={item.id}
              imageUrl={item.images?.[0]?.url}
              name={item.name}
              onClick={() => router.push(`/artist/${item.id}`)}
            />
          ))
      )}
    </div>
  );
}
