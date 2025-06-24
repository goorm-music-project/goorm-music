"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function InnerCallback() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    fetch("/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          document.cookie = `access_token=${data.access_token}; path=/; max-age=3600`;

          router.push("/");
        } else {
          alert("⚠️ 로그인 실패. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("❌ Token fetch error:", err);
        alert("로그인 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
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
