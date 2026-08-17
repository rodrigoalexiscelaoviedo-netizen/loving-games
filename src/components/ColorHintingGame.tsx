import { useState, useEffect } from 'react';
import { getGamesByCategory } from '../games/gameDatabase';
import type { Intensity, ColorHintGame } from '../games/gameDatabase';

interface Props {
  theme: string;
  difficulty: Intensity;
  onComplete: () => void;
  onBack: () => void;
}

export function ColorHintingGame({ theme, difficulty, onComplete, onBack }: Props) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

  // Obtener juego para este tema
  const allColorGames = getGamesByCategory('colors-hinting').filter(g => g.category === 'colors-hinting') as ColorHintGame[];
  const gameForTheme = allColorGames.find(g => g.theme === (theme as any) && g.difficulty === difficulty) || allColorGames[0];

  const items = gameForTheme.items || [];

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const toggleItem = (index: number) => {
    const newSet = new Set(completedItems);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setCompletedItems(newSet);
  };

  const progress = Math.round((completedItems.size / items.length) * 100);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeWarning = timeLeft < 60;

  const capturePhoto = () => {
    alert('📸 Foto capturada (demo)');
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-[#E0E0E0]/50 text-xl">←</button>
        <h1 className="text-xl font-extrabold text-[#00D4AA]">{gameForTheme.emoji} {gameForTheme.title}</h1>
        <div className="w-8" />
      </div>

      {/* Timer */}
      <div className={`
        text-center mb-6 p-4 rounded-xl font-extrabold text-3xl
        ${timeWarning ? 'bg-[#FF6347]/20 text-[#FF6347]' : 'bg-[#00D4AA]/20 text-[#00D4AA]'}
      `}>
        ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-xs font-bold text-[#E0E0E0]/60">Progreso</p>
          <p className="text-xs font-bold text-[#00D4AA]">{completedItems.size}/{items.length}</p>
        </div>
        <div className="w-full bg-[#1A1A2E] rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#00D4AA] to-[#FF6B6B] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 mb-6 overflow-y-auto max-w-lg mx-auto w-full">
        <div className="space-y-2">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`
                w-full p-3 rounded-lg transition-all text-left flex items-center gap-3
                ${completedItems.has(idx)
                  ? 'bg-[#00D4AA] text-[#0F0F1E] line-through'
                  : 'bg-[#1A1A2E] border border-[#2A2A3E] text-[#E0E0E0] hover:border-[#00D4AA]'
                }
              `}
            >
              <span className="text-xl">{completedItems.has(idx) ? '✓' : '○'}</span>
              <span className="font-medium">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-lg mx-auto w-full">
        <button
          onClick={capturePhoto}
          className="
            w-full bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#0F0F1E]
            font-bold py-3 rounded-xl flex items-center justify-center gap-2
          "
        >
          📸 Capturar foto
        </button>
        <button
          onClick={() => completedItems.size === items.length && onComplete()}
          disabled={completedItems.size !== items.length}
          className={`
            w-full font-bold py-3 rounded-xl text-lg
            ${completedItems.size === items.length
              ? 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white'
              : 'bg-[#2A2A3E] text-[#E0E0E0]/40 cursor-not-allowed'
            }
          `}
        >
          ✓ ¡Lo hicimos! ({completedItems.size}/{items.length})
        </button>
      </div>
    </div>
  );
}
