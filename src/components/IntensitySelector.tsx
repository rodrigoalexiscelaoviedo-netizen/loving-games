import type { Intensity } from '../games/gameDatabase';

interface Props {
  onSelect: (intensity: Intensity) => void;
  selected: Intensity | null;
  availableIntensities: { suave: string; medio?: string; intenso?: string };
}

const INTENSITIES: Array<{ key: Intensity; emoji: string; label: string; bg: string; activeBg: string }> = [
  { key: 'suave', emoji: '🟡', label: 'Suave', bg: 'bg-[#2A2A3E]', activeBg: 'bg-[#FFE5B4]' },
  { key: 'medio', emoji: '🟠', label: 'Medio', bg: 'bg-[#2A2A3E]', activeBg: 'bg-[#FFB347]' },
  { key: 'intenso', emoji: '🔴', label: 'Intenso', bg: 'bg-[#2A2A3E]', activeBg: 'bg-[#FF6347]' },
];

export function IntensitySelector({ onSelect, selected, availableIntensities }: Props) {
  return (
    <div className="flex gap-3 justify-center w-full max-w-sm mx-auto">
      {INTENSITIES.map(({ key, emoji, label, bg, activeBg }) => {
        const available = availableIntensities[key] !== undefined;
        if (!available) return null;

        const isSelected = selected === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`
              flex-1 flex flex-col items-center gap-1.5 py-3 px-4 rounded-xl
              transition-all duration-200 border-2
              ${isSelected
                ? `${activeBg} text-[#0F0F1E] border-transparent scale-105 shadow-lg font-bold`
                : `${bg} text-[#E0E0E0] border-[#2A2A3E] hover:border-[#4A4A5E]`
              }
            `}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs font-semibold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
