import { FaPlay, FaPause } from "react-icons/fa";

interface PlaybackControlsProps {
  paused: boolean;
  isLoading: boolean;
  onTogglePlay: () => Promise<void>;
}

export default function PlaybackControls({ paused, isLoading, onTogglePlay }: PlaybackControlsProps) {
  return (
    <button
      onClick={onTogglePlay}
      disabled={isLoading}
      className="w-10 h-10 bg-(--primary-blue) hover:bg-(--primary-blue-hover) disabled:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : paused ? (
        <FaPlay className="w-4 h-4 ml-0.5" />
      ) : (
        <FaPause className="w-4 h-4" />
      )}
    </button>
  );
} 