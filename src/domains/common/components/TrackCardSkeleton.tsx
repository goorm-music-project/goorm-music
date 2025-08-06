export default function TrackCardSkeleton({
  showSub = false,
}: {
  showSub?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-[150px] animate-pulse py-2">
      <div className="w-[150px] h-[150px] bg-gray-300 rounded" />
      <div className="bg-gray-300 h-4 w-[80%] rounded" />
      {showSub && <div className="bg-gray-200 h-4 w-[60%] rounded" />}
    </div>
  );
}
