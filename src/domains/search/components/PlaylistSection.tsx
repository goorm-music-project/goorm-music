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

export default function PlaylistSection({ data }: { data: Props }) {
  return (
    <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
      {data &&
        data?.items
          ?.filter((item) => item !== null)
          .map((item) => (
            <Link href={`/playlist/${item.id}`} key={item.id}>
              <TrackCard
                imageUrl={item.images[0].url || "/goorm_logo_blue.png"}
                name={item.name}
              />
            </Link>
          ))}
    </div>
  );
}
