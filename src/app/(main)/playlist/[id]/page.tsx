"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const id = params.id;
  return <div>플레이 리스트 id : {id}</div>;
}
