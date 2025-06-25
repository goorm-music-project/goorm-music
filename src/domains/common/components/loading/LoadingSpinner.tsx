"use client";
import { useLoadingStore } from "@/domains/common/stores/loadingStore";

export default function LoadingSpinner() {
  const { isLoading } = useLoadingStore();
  if (!isLoading) return null;
  return (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10 rounded">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-700">처리 중...</span>
      </div>
    </div>
  );
}
