export default function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-center gap-6 py-6 px-4 md:px-8 w-full animate-pulse">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex flex-col justify-center flex-1 gap-2">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-5 w-40 bg-gray-100 rounded" />
        <div className="h-4 w-28 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
