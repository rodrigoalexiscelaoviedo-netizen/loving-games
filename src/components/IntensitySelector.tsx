import type { Intensity } from '../games/gameDatabase';

interface IntensitySelectorProps {
  onSelect: (intensity: Intensity) => void;
  selected: Intensity | null;
}

export function IntensitySelector({ onSelect, selected }: IntensitySelectorProps) {
  const intensities: Array<{ key: Intensity; emoji: string; label: string }> = [
    { key: 'suave', emoji: '🟡', label: 'Suave' },
    { key: 'medio', emoji: '🟠', label: 'Medio' },
    { key: 'intenso', emoji: '🔴', label: 'Intenso' },
  ];

  return (
    <div className="flex gap-4 justify-center mb-8">
      {intensities.map(({ key, emoji, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`
            flex flex-col items-center gap-2 px-6 py-4 rounded-lg transition-all
            ${selected === key
              ? 'bg-coral text-white scale-110 shadow-lg'
              : 'bg-mid text-light hover:bg-mid/80'
            }
          `}
        >
          <span className="text-3xl">{emoji}</span>
          <span className="text-xs font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
}
