import { useState, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGameStore } from '../store/gameStore';
import { IntensitySelector } from '../components/IntensitySelector';
import { GameCard } from '../components/GameCard';
import { Celebration } from '../components/Celebration';
import { saveGameSession } from '../lib/supabase';
import { getRandomGame } from '../games/gameDatabase';
import type { Intensity } from '../games/gameDatabase';

export function GameScreen() {
  const navigate = useNavigate();
  const { currentGame, selectedIntensity, setSelectedIntensity, setCurrentGame, addPlayedGame, playedGameIds, reset } = useGameStore();
  const [showCelebration, setShowCelebration] = useState(false);

  const handleComplete = useCallback(async () => {
    if (!currentGame || !selectedIntensity) return;

    try {
      await saveGameSession(
        currentGame.id,
        currentGame.category,
        selectedIntensity,
        currentGame.title,
        true
      );
    } catch (e) {
      console.warn('Could not save to Supabase');
    }

    addPlayedGame(currentGame.id);
    setShowCelebration(true);
  }, [currentGame, selectedIntensity, addPlayedGame]);

  const handleNext = useCallback(() => {
    const game = getRandomGame(playedGameIds);
    setCurrentGame(game);
  }, [playedGameIds, setCurrentGame]);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    reset();
    navigate({ to: '/' });
  }, [navigate, reset]);

  if (!currentGame) {
    navigate({ to: '/' });
    return null;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] flex flex-col items-center px-4 py-6">

      {/* Header */}
      <div className="w-full max-w-lg flex items-center mb-8">
        <button
          onClick={() => { reset(); navigate({ to: '/' }); }}
          className="text-[#E0E0E0]/50 hover:text-white text-xl p-2"
        >
          ← Volver
        </button>
      </div>

      {/* Game Card */}
      <div className="w-full max-w-lg mb-8">
        <GameCard game={currentGame} intensity={selectedIntensity} />
      </div>

      {/* Intensity Selector */}
      <div className="w-full max-w-lg mb-8">
        <IntensitySelector
          selected={selectedIntensity}
          onSelect={(i: Intensity) => setSelectedIntensity(i)}
          availableIntensities={currentGame.intensities}
        />
      </div>

      {/* Action buttons */}
      {selectedIntensity && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={handleComplete}
            className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-[#FF6B6B]/20"
          >
            ✓ Listo, lo hicimos
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleNext}
              className="flex-1 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#0F0F1E] font-bold py-3 rounded-xl"
            >
              → Otro juego
            </button>
            <button
              onClick={() => { reset(); navigate({ to: '/' }); }}
              className="flex-1 bg-[#2A2A3E] hover:bg-[#3A3A4E] text-[#E0E0E0] font-bold py-3 rounded-xl"
            >
              🏠 Inicio
            </button>
          </div>
        </div>
      )}

      {/* Celebration */}
      <Celebration show={showCelebration} onComplete={handleCelebrationComplete} />
    </div>
  );
}
