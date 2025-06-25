"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useSpotifyStore } from "@/domains/common/stores/useSpotifyStore";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function InnerCallback() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.post("/api/token", { code });

        const accessToken = res.data.access_token;

        // 액세스 토큰을 쿠키에 저장
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
          useSpotifyStore.getState().setAccessToken(accessToken);
          router.push("/");
        } else {
          alert("로그인 실패, 다시 시도해주세요.");
        }

        const userData = await fetch("/api/userData", {
          method: "POST",
        });
        const data = await userData.json();

        if (data.userId) {
          useSpotifyStore.getState().setUserId(data.userId);
        }
      } catch (error) {
        console.error("Token 발급 중 오류 발생", error);
        alert("로그인 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    if (code) {
      fetchToken();
    }
  }, [code, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>처리 완료. 메인 페이지로 돌아갑니다.</div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerCallback />
    </Suspense>
  );
}
