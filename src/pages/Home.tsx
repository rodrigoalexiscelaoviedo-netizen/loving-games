import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGameStore } from '../store/gameStore';
import { getRandomGame, getRandomGameByCategory, CATEGORY_INFO } from '../games/gameDatabase';
import { getPlayedGameIds } from '../lib/supabase';
import type { GameCategory } from '../games/gameDatabase';

export function Home() {
  const navigate = useNavigate();
  const { playedGameIds, setPlayedGameIds, setCurrentGame, reset } = useGameStore();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const ids = await getPlayedGameIds();
        setPlayedGameIds(ids);
      } catch (e) {
        console.warn('Supabase not configured, playing without history');
      }
    };
    loadHistory();
  }, [setPlayedGameIds]);

  const handlePlayNow = () => {
    reset();
    const game = getRandomGame(playedGameIds);
    setCurrentGame(game);
    navigate({ to: '/game' });
  };

  const handleCategorySelect = (category: GameCategory) => {
    reset();
    const game = getRandomGameByCategory(category, playedGameIds);
    setCurrentGame(game);
    navigate({ to: '/game' });
  };

  const categories = Object.entries(CATEGORY_INFO) as [GameCategory, typeof CATEGORY_INFO[GameCategory]][];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] flex flex-col items-center px-4 py-8">

      {/* Logo / Header */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-[#FF6B6B]">Loving</span>{' '}
          <span className="text-white">Games</span>
        </h1>
        <p className="text-[#E0E0E0]/50 text-sm mt-2">¿Qué hacemos hoy? 💕</p>
      </div>

      {/* Botón principal */}
      <button
        onClick={handlePlayNow}
        className="
          w-28 h-28 rounded-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90
          flex items-center justify-center text-5xl mb-4
          transition-all transform hover:scale-110 active:scale-95
          shadow-2xl shadow-[#FF6B6B]/30
        "
      >
        🎲
      </button>
      <p className="text-[#E0E0E0]/40 text-xs mb-10">Toca para jugar al azar</p>

      {/* Categorías */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-10">
        {categories.map(([key, info]) => (
          <button
            key={key}
            onClick={() => handleCategorySelect(key)}
            className="
              bg-[#1A1A2E] hover:bg-[#2A2A3E] rounded-xl p-5 text-center
              transition-all transform hover:scale-[1.03] active:scale-95
              border border-[#2A2A3E] hover:border-[#4A4A5E]
            "
          >
            <div className="text-3xl mb-2">{info.emoji}</div>
            <p className="text-sm font-bold text-white">{info.label}</p>
            <p className="text-[10px] text-[#E0E0E0]/40 mt-1">{info.description}</p>
          </button>
        ))}
      </div>

      {/* Footer links */}
      <div className="flex gap-6 mt-auto pb-6">
        <button
          onClick={() => navigate({ to: '/history' })}
          className="text-[#E0E0E0]/40 hover:text-[#E0E0E0] text-sm flex items-center gap-1.5"
        >
          📜 Historial
        </button>
        <button
          onClick={() => navigate({ to: '/settings' })}
          className="text-[#E0E0E0]/40 hover:text-[#E0E0E0] text-sm flex items-center gap-1.5"
        >
          ⚙️ Ajustes
        </button>
      </div>
    </div>
  );
}
