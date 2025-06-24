import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function PlaylistDetailPage({ params }: Props) {
  const { id } = params;

  if (!id) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">플레이리스트 상세 페이지</h1>
      <p className="mt-2 text-gray-700">선택된 플레이리스트 ID: {id}</p>
      {/* 여기에 나중에 API로 불러온 트랙 목록, 커버 이미지 등 추가 */}
    </div>
  );
}
