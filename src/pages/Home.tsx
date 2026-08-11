import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGameStore } from '../store/gameStore';
import { getRandomGame, getCategories, getGamesByCategory } from '../games/gameDatabase';
import { getPlayedGameIds } from '../lib/supabase';

export function Home() {
  const navigate = useNavigate();
  const { playedGameIds, setPlayedGameIds, setCurrentGame, reset } = useGameStore();

  useEffect(() => {
    const loadHistory = async () => {
      const ids = await getPlayedGameIds();
      setPlayedGameIds(ids);
    };
    loadHistory();
  }, [setPlayedGameIds]);

  const handlePlayNow = async () => {
    reset();
    const game = getRandomGame(playedGameIds);
    setCurrentGame(game);
    navigate({ to: '/game' });
  };

  const handleCategorySelect = (category: string) => {
    reset();
    const games = getGamesByCategory(category as any);
    const game = games[Math.floor(Math.random() * games.length)];
    setCurrentGame(game);
    navigate({ to: '/game' });
  };

  const categories = [
    { key: 'preguntas', emoji: '💭', label: 'Preguntas' },
    { key: 'retos', emoji: '💪', label: 'Retos' },
    { key: 'roleplay', emoji: '🎭', label: 'Roleplay' },
    { key: 'sorpresas', emoji: '🎲', label: 'Sorpresas' },
  ];

  return (
    <div className="min-h-screen bg-dark text-light flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coral mb-2">¿Qué hacemos hoy?</h1>
        <p className="text-light/60">Juegos para ustedes dos</p>
      </div>

      <button
        onClick={handlePlayNow}
        className="
          w-32 h-32 rounded-full bg-coral hover:bg-coral/90
          flex items-center justify-center text-5xl mb-12
          transition-all transform hover:scale-110 active:scale-95
          shadow-lg shadow-coral/50
        "
      >
        🎲
      </button>

      <div className="grid grid-cols-2 gap-4 max-w-sm w-full mb-8">
        {categories.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => handleCategorySelect(key)}
            className="
              bg-mid hover:bg-mid/80 rounded-lg p-6 text-center
              transition-all transform hover:scale-105
              border border-mid/50
            "
          >
            <div className="text-3xl mb-2">{emoji}</div>
            <p className="text-sm font-semibold text-light">{label}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate({ to: '/history' })}
          className="text-light/60 hover:text-light text-sm"
        >
          📜 Historial
        </button>
        <button
          onClick={() => navigate({ to: '/settings' })}
          className="text-light/60 hover:text-light text-sm"
        >
          ⚙️ Ajustes
        </button>
      </div>
    </div>
  );
}
