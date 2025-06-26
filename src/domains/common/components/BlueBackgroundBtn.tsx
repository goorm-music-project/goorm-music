interface BlueBackgroundBtnProps {
  children: string;
  onClick: () => void;
  className?: string; // className도 허용
}

export default function BlueBackgroundBtn({
  children,
  onClick,
  className = "",
}: BlueBackgroundBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full border font-semibold text-sm bg-[#6CC2FF] text-white border-[#6CC2FF] ${className}`}
    >
      {children}
    </button>
  );
}
