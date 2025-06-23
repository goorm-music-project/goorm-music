import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function ArtistDetailPage({ params }: Props) {
  const { id } = params;

  // 나중에 id로 fetch 요청해서 아티스트 정보 가져올 수 있음
  if (!id) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">아티스트 상세 페이지</h1>
      <p className="mt-2 text-gray-700">선택된 아티스트 ID: {id}</p>
    </div>
  );
}
