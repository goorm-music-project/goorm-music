export default function TrackCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 items-center w-[150px] animate-pulse">
      <div className="w-[150px] h-[150px] bg-gray-300 rounded" />
      <div className="bg-gray-300 h-4 w-[80%] rounded" />
      <div className="bg-gray-200 h-3 w-[60%] rounded" />
    </div>
  );
}
