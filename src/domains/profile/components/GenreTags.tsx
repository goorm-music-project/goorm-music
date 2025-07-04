// src/domains/profile/components/GenreTags.tsx

interface GenreTagsProps {
  genres: string[];
}

export default function GenreTags({ genres }: GenreTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-6">
      {genres.map((genre) => (
        <span
          key={genre}
          className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
