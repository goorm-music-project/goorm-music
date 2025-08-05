"use client";

import LoadingSpinner from "@/domains/common/components/LoadingSpinner";
import { userSpotifyStore } from "@/domains/common/stores/userSpotifyStore";

import axios from "axios";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function InnerCallback() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

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
          userSpotifyStore.getState().setProduct(data.product);
        }
        if (res.data.success) {
          if (data.userExists) {
            router.push("/");
          } else {
            router.push("/select-genre");
          }

          localStorage.setItem("userId", data.userId);
        }
      } catch (error) {
        console.error("Token 발급 중 오류 발생", error);
        setErrorMsg(
          "로그인 중 오류가 발생했습니다. 로그인 페이지로 돌아가시겠습니까?"
        );
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
      ) : errorMsg === "" ? (
        <div>처리 완료. 메인 페이지로 돌아갑니다.</div>
      ) : (
        <div className=" flex flex-col justify-center items-center">
          <h2 className="mb-5">{errorMsg}</h2>
          <button className="flex items-center border border-gray-800 pr-4 rounded hover:bg-gray-100" onClick={() => router.push("/login")}>
            <Image src="/goorm_logo_blue.png" alt="로고" width={100} height={100} />
            돌아가기
          </button>
        </div>
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
