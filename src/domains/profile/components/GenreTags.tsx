interface Props {
  genres: string[];
  onEdit?: () => void;
}

const GenreTags = ({ genres, onEdit }: Props) => (
  <div className="mt-5">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-semibold text-gray-900">선호 장르</h3>
      {onEdit && (
        <button
          className="text-blue-500 hover:text-blue-600 text-xs px-2 py-1 rounded"
          onClick={onEdit}
        >
          편집
        </button>
      )}
    </div>
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold"
        >
          {genre}
        </span>
      ))}
    </div>
  </div>
);

export default GenreTags;
