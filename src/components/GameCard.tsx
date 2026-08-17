import type { Game, Intensity } from '../games/gameDatabase';
import { CATEGORY_INFO } from '../games/gameDatabase';

interface Props {
  game: Game;
  intensity: Intensity | null;
}

export function GameCard({ game, intensity }: Props) {
  const content = intensity && game.intensities ? game.intensities[intensity] : null;
  const categoryInfo = CATEGORY_INFO[game.category];

  return (
    <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[280px] w-full max-w-lg mx-auto shadow-xl">
      {/* Category badge */}
      <span
        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
        style={{ backgroundColor: categoryInfo.color + '20', color: categoryInfo.color }}
      >
        {categoryInfo.emoji} {categoryInfo.label}
      </span>

      {/* Emoji */}
      <div className="text-5xl mb-4">{game.emoji}</div>

      {/* Title */}
      <h2 className="text-2xl font-extrabold text-white mb-2">{game.title}</h2>

      {/* Duration */}
      {game.duration && (
        <p className="text-xs text-[#E0E0E0]/40 mb-6">⏱ {game.duration}</p>
      )}

      {/* Content */}
      {content ? (
        <div className="mt-4 px-2">
          <p className="text-lg text-[#E0E0E0] leading-relaxed">{content}</p>
        </div>
      ) : (
        <p className="text-sm text-[#E0E0E0]/50 mt-4">👆 Elegí un nivel de intensidad</p>
      )}
    </div>
  );
}
