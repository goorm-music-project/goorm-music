"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function InnerCallback() {
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      console.log("✅ code:", code);
    }
  }, [code]);

  return <div>Spotify 로그인 처리 중...</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerCallback />
    </Suspense>
  );
}
