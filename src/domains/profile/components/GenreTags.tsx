"use client";
import { useProfileStore } from "../stores/useProfileStore";

export default function GenreTags() {
  const profile = useProfileStore((s) => s.profile);

  if (!profile || !profile.genres) return null;

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {profile.genres.map((genre) => (
        <span
          key={genre}
          className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
