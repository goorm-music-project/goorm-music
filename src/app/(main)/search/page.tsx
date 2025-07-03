/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AlertModal from "@/domains/common/components/AlertModal";
import ConfirmModal from "@/domains/common/components/ConfirmModal";
import PlayBar from "@/domains/main/components/PlayBar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("params") || "";
  const [data, setData] = useState<any>([]);
  const [isLoading, setisLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [followId, setFollowId] = useState<number | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleFollow = async (id: number) => {
    setMessage("Follow 하시겠습니까?");
    setFollowId(id);
    setShowConfirmModal(true);
  };

  const confirmFollow = async () => {
    if (!followId) return;

    try {
      await fetch("/api/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: followId,
        }),
      });
      setMessage("Follow가 완료되었습니다.");
      setShowAlertModal(true);
    } catch (err) {
      console.log("팔로우 추가 오류", err);
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setisLoading(true);
        const res = await fetch(
          `/api/search?searchText=${encodeURIComponent(query)}`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log("검색 오류", err);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h2 className="mb-2">대표 아티스트</h2>
        <div className="h-[15vh] overflow-y-auto">
          {data &&
            data.artists?.items?.slice(0, 1).map((item: any) => (
              <div key={item.id}>
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <p className="truncate">{item.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">곡</h2>
        <div className="h-[30vh] overflow-y-auto">
          {data?.tracks && <PlayBar tracks={data.tracks} />}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">앨범</h2>
        <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
          {data &&
            data.albums?.items?.map((item: any) => (
              <div key={item.id} className="w-[100px] h-[100px]">
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{ height: "100%" }}
                />
                <p className="truncate">{item.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="my-2">플레이리스트</h2>
        <div className="h-[30vh] overflow-y-auto flex gap-4 flex-wrap">
          {data &&
            data?.playlists?.items
              ?.filter((item: any) => item !== null)
              .map((item: any) => (
                <div
                  key={item?.id}
                  className="w-[100px] h-[100px] pointer"
                  onClick={() => handleFollow(item?.id)}
                >
                  <Image
                    src={
                      item?.images?.length > 0
                        ? item.images[0].url
                        : "/goorm_logo_blue.png"
                    }
                    alt={item?.name}
                    width={100}
                    height={100}
                    style={{ height: "100%" }}
                  />
                  <p className="truncate">{item?.name}</p>
                </div>
              ))}
        </div>
        <ConfirmModal
          showModal={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          confirmFollow={confirmFollow}
          message={message}
        />
        <AlertModal
          showModal={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          message={message}
        />
      </div>
    </div>
  );
}
