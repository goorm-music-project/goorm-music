import { FaVolumeUp } from "react-icons/fa";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  return (
    <div className="flex items-center space-x-2">
      <FaVolumeUp className="w-4 h-4 text-gray-400" />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-20 h-2 bg-(--primary-blue) rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6cc2ff 0%, #6cc2ff ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
        }}
      />
    </div>
  );
} 