import type { Game, Intensity } from '../games/gameDatabase';

interface GameCardProps {
  game: Game;
  intensity: Intensity | null;
  content: string;
}

export function GameCard({ game, intensity, content }: GameCardProps) {
  return (
    <div className="bg-dark border-2 border-gold rounded-xl p-8 text-center min-h-96 flex flex-col justify-center">
      <div className="text-5xl mb-4">{game.emoji}</div>
      <h2 className="text-2xl font-bold text-coral mb-6">{game.title}</h2>

      {intensity && (
        <div className="mb-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              intensity === 'suave'
                ? 'bg-intensity-suave text-dark'
                : intensity === 'medio'
                ? 'bg-intensity-medio text-dark'
                : 'bg-intensity-intenso text-white'
            }`}
          >
            {intensity.toUpperCase()}
          </span>
        </div>
      )}

      {content && (
        <p className="text-lg text-light leading-relaxed max-w-md mx-auto">
          {content}
        </p>
      )}
    </div>
  );
}
