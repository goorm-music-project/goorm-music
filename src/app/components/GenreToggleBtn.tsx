interface ToggleBtnProps {
  children: string;
  selected: boolean;
  onToggle: (genre: string) => void;
}

export default function GenreToggleBtn({
  children,
  selected,
  onToggle,
}: ToggleBtnProps) {
  return (
    <button
      onClick={() => onToggle(children)}
      className={`px-4 py-1.5 rounded-full border font-semibold text-sm transition
        ${
          selected
            ? "bg-(--primary-blue) text-white border-(--primary-blue)"
            : "bg-white text-(--primary-blue) border-(--primary-blue)"
        }
      `}
    >
      {children}
    </button>
  );
}
