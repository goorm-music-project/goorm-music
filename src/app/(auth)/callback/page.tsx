"use client";

import LoadingSpinner from "@/app/components/loading/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";
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

        const userData = await fetch("/api/userData", {
          method: "POST",
        });
        const data = await userData.json();

        if (data.userId) {
          userSpotifyStore.getState().setUserId(data.userId);
          userSpotifyStore.getState().setIsLoggedIn(true);
        }
        if (res.data.success) {
          if (data.userExists) {
            router.push("/");
          } else {
            router.push("/select-genre");
          }
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
