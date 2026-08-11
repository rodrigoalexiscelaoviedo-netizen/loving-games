import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGameStore } from '../store/gameStore';
import { IntensitySelector } from '../components/IntensitySelector';
import { GameCard } from '../components/GameCard';
import { Celebration } from '../components/Celebration';
import { saveGameSession } from '../lib/supabase';
import type { Intensity } from '../games/gameDatabase';

export function GameScreen() {
  const navigate = useNavigate();
  const { currentGame, selectedIntensity, setSelectedIntensity, addPlayedGame } = useGameStore();
  const [showCelebration, setShowCelebration] = useState(false);

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-light">Cargando...</p>
      </div>
    );
  }

  const gameContent = currentGame.intensities[selectedIntensity || 'suave'];

  const handleComplete = async () => {
    if (!selectedIntensity) return;

    await saveGameSession(
      currentGame.id,
      currentGame.category,
      selectedIntensity,
      currentGame.title,
      true
    );
    addPlayedGame(currentGame.id);
    setShowCelebration(true);
  };

  const handleNext = () => {
    navigate({ to: '/' });
  };

  const handleSkip = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-dark text-light flex flex-col items-center justify-center p-4">
      <button
        onClick={handleSkip}
        className="absolute top-4 left-4 text-light/60 hover:text-light text-2xl"
      >
        ←
      </button>

      <div className="mb-6">
        <span className="text-xs font-semibold text-gold uppercase tracking-wider">
          {currentGame.category}
        </span>
      </div>

      <div className="mb-10 w-full max-w-2xl">
        <GameCard
          game={currentGame}
          intensity={selectedIntensity}
          content={gameContent}
        />
      </div>

      {!selectedIntensity && (
        <div className="mb-10 w-full">
          <p className="text-center text-light/70 mb-6">Elegí nivel de intensidad</p>
          <IntensitySelector
            selected={selectedIntensity}
            onSelect={(intensity) => setSelectedIntensity(intensity)}
          />
        </div>
      )}

      {selectedIntensity && (
        <div className="flex gap-4 max-w-sm w-full">
          <button
            onClick={handleComplete}
            className="
              flex-1 bg-coral hover:bg-coral/90 text-white
              font-semibold py-3 rounded-lg transition-all
            "
          >
            ✓ Listo, lo hicimos
          </button>
          <button
            onClick={handleNext}
            className="
              flex-1 bg-mint hover:bg-mint/90 text-dark
              font-semibold py-3 rounded-lg transition-all
            "
          >
            → Siguiente
          </button>
          <button
            onClick={() => {/* TODO: guardar para después */}}
            className="
              flex-1 bg-gold hover:bg-gold/90 text-dark
              font-semibold py-3 rounded-lg transition-all
            "
          >
            ♡ Guardar
          </button>
        </div>
      )}

      <Celebration
        show={showCelebration}
        onComplete={() => {
          setShowCelebration(false);
          navigate({ to: '/' });
        }}
      />
    </div>
  );
}
