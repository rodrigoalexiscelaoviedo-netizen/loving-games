import { useNavigate } from '@tanstack/react-router';
import { GAMES, CATEGORY_INFO } from '../games/gameDatabase';
import type { GameCategory } from '../games/gameDatabase';

export function Settings() {
  const navigate = useNavigate();

  const stats = Object.entries(CATEGORY_INFO).map(([key, info]) => ({
    ...info,
    count: GAMES.filter(g => g.category === key as GameCategory).length,
  }));

  const totalGames = GAMES.length;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-[#E0E0E0]/50 hover:text-white text-xl p-2"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-extrabold text-white ml-2">Ajustes</h1>
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        {/* Jugadores */}
        <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-5">
          <p className="text-xs text-[#E0E0E0]/40 uppercase tracking-wider mb-2">Jugadores</p>
          <p className="text-lg font-bold text-[#FF6B6B]">Rodrigo & Nadia 💕</p>
        </div>

        {/* Stats */}
        <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-5">
          <p className="text-xs text-[#E0E0E0]/40 uppercase tracking-wider mb-3">Contenido disponible</p>
          <p className="text-2xl font-extrabold text-white mb-4">{totalGames} juegos</p>
          <div className="space-y-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0]/60">{s.emoji} {s.label}</span>
                <span className="text-sm font-bold text-white">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-5">
          <p className="text-xs text-[#E0E0E0]/40 uppercase tracking-wider mb-2">App</p>
          <p className="text-sm text-[#E0E0E0]/60">Loving Games v1.0.0</p>
          <p className="text-xs text-[#E0E0E0]/30 mt-1">Hecho con 💕 para Rodrigo & Nadia</p>
        </div>
      </div>
    </div>
  );
}
