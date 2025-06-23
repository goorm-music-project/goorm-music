"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      console.log("✅ Spotify 로그인 성공, code:", code);
      // 여기서 백엔드로 code 보내서 access_token 요청
    }
  }, [code]);

  return <div>Spotify 로그인 중...</div>;
}
