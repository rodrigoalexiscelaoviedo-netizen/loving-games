import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGameStore } from '../store/gameStore';
import { IntensitySelector } from '../components/IntensitySelector';
import { GameCard } from '../components/GameCard';
import { Celebration } from '../components/Celebration';
import { saveGameSession } from '../lib/supabase';
import { getRandomGame } from '../games/gameDatabase';
import type { Intensity, ColorHintGame } from '../games/gameDatabase';

export function GameScreen() {
  const navigate = useNavigate();
  const { currentGame, selectedIntensity, setSelectedIntensity, setCurrentGame, addPlayedGame, playedGameIds, reset } = useGameStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);

  const isColorHinting = currentGame?.category === 'colors-hinting';
  const colorHintGame = (isColorHinting ? currentGame : null) as ColorHintGame | null;

  // Timer para Colors Hinting
  useEffect(() => {
    if (!isColorHinting || !gameStarted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setShowCelebration(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isColorHinting, gameStarted, timeLeft]);

  const handleStartGame = () => {
    if (colorHintGame) {
      setGameStarted(true);
      setTimeLeft(colorHintGame.gameTime * 60);
    }
  };

  const handleToggleItem = (index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleCapturePhoto = () => {
    // Visual only - no actual save
    alert('📸 Foto capturada (demo)');
  };

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
    setCheckedItems(new Set());
    setGameStarted(false);
    setTimeLeft(0);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Colors Hinting UI
  if (isColorHinting && colorHintGame) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] flex flex-col items-center px-4 py-6">
        {/* Header */}
        <div className="w-full max-w-lg flex items-center justify-between mb-6">
          <button
            onClick={() => { reset(); navigate({ to: '/' }); }}
            className="text-[#E0E0E0]/50 hover:text-white text-xl p-2"
          >
            ← Volver
          </button>
          {gameStarted && (
            <div className={`text-2xl font-bold ${timeLeft <= 60 ? 'text-[#FF6B6B]' : 'text-[#00D4AA]'}`}>
              {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Game Card */}
        <div className="w-full max-w-lg mb-6 bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6">
          <div className="text-center">
            <div className="text-5xl mb-3">{currentGame.emoji}</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">{currentGame.title}</h2>
            <p className="text-xs text-[#E0E0E0]/40">⏱ {colorHintGame.gameTime} minutos</p>
          </div>
        </div>

        {!gameStarted ? (
          <button
            onClick={handleStartGame}
            className="w-full max-w-sm bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-bold py-4 rounded-xl text-lg mb-6"
          >
            🎬 Comenzar búsqueda
          </button>
        ) : (
          <>
            {/* Items checklist */}
            <div className="w-full max-w-sm bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Elementos ({checkedItems.size}/{colorHintGame.items.length})</h3>
              </div>
              <div className="space-y-2">
                {colorHintGame.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleItem(idx)}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${checkedItems.has(idx)
                        ? 'bg-[#FF6B6B]/20 border-[#FF6B6B] line-through text-[#E0E0E0]/60'
                        : 'bg-[#2A2A3E] border-[#3A3A4E] text-[#E0E0E0]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${checkedItems.has(idx) ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-[#E0E0E0]/30'}`}>
                        {checkedItems.has(idx) && <span className="text-white text-sm">✓</span>}
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capture button */}
            <button
              onClick={handleCapturePhoto}
              className="w-full max-w-sm bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#0F0F1E] font-bold py-3 rounded-xl mb-6"
            >
              📸 Capturar foto
            </button>

            {/* Action buttons */}
            {checkedItems.size === colorHintGame.items.length && (
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <button
                  onClick={handleComplete}
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-[#FF6B6B]/20"
                >
                  ✓ ¡Lo hicimos!
                </button>
              </div>
            )}
          </>
        )}

        {/* Celebration */}
        <Celebration show={showCelebration} onComplete={handleCelebrationComplete} />
      </div>
    );
  }

  // Regular game UI
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
      {currentGame.intensities && (
        <div className="w-full max-w-lg mb-8">
          <IntensitySelector
            selected={selectedIntensity}
            onSelect={(i: Intensity) => setSelectedIntensity(i)}
            availableIntensities={currentGame.intensities}
          />
        </div>
      )}

      {/* Action buttons */}
      {selectedIntensity && currentGame.intensities && (
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
