/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

export default function CardComponent({ item }: { item: any }) {
  return (
    <div key={item.id} className="w-[150px] h-[150px]">
      <div className="h-[130px] relative">
        <Image src={item.images[0]?.url} alt={item.name} fill sizes="150px" />
      </div>
      <p className="truncate">{item.name}</p>
    </div>
  );
}
