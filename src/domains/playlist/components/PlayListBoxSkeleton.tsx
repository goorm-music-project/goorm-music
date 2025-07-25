export default function PlayListBoxSkeleton() {
  return (
    <div className="flex gap-4 p-2 rounded animate-pulse">
      <div className="w-[100px] h-[100px] bg-gray-300 rounded" />
      <div className="flex flex-col justify-center gap-2 w-full overflow-hidden">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}
