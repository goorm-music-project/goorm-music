import Image from "next/image";
import React from "react";
import { PlaylistDetail } from "../types/Playlist";
import Link from "next/link";

interface Props {
  listData: PlaylistDetail;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlaylistDelBtn: () => void;
  canEdit: boolean;
}

export default function PlayListDetailInfo({
  listData,
  setIsEdit,
  handlePlaylistDelBtn,
  canEdit,
}: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src={listData.images?.[0]?.url || "/goorm_logo_blue.png"}
        alt={listData.name}
        width={250}
        height={250}
        className="rounded"
        style={{ maxWidth: "none" }}
      />
      {!canEdit && (
        <div className="mt-2">
          <Link href={`/profile/${listData.owner.id}`}>
            <span
              className="font-semibold cursor-pointer hover:underline"
              style={{
                color: "var(--primary-blue)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "var(--primary-blue-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "var(--primary-blue)")
              }
            >
              프로필로 이동
            </span>
          </Link>
        </div>
      )}

      {canEdit && (
        <div className="text-center">
          <button
            className="primaryBtn py-1.5 px-2 mr-2"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            수정
          </button>
          <button
            className="errorBtn py-1.5 px-2"
            onClick={handlePlaylistDelBtn}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
