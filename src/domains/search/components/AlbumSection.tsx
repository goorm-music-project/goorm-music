import TrackCard from "@/domains/common/components/TrackCard";
import Link from "next/link";
import React from "react";

interface Props {
  items: Array<{
    id: string;
    name: string;
    images: { url: string }[];
  }>;
}

export default function AlbumSection({ data }: { data: Props }) {
  return (
    <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
      {data.items.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        data?.items?.map((item) => (
          <Link href={`/album/${item.id}`} key={item.id}>
            <TrackCard
              key={item.id}
              imageUrl={item.images?.[0]?.url}
              name={item.name}
            />
          </Link>
        ))
      )}
    </div>
  );
}
