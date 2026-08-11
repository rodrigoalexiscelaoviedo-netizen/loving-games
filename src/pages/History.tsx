import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getGameHistory } from '../lib/supabase';
import { CATEGORY_INFO } from '../games/gameDatabase';
import type { GameCategory } from '../games/gameDatabase';

interface HistoryItem {
  id: string;
  game_id: string;
  game_category: string;
  game_title: string;
  intensity: string;
  completed: boolean;
  created_at: string;
}

export function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGameHistory(30);
        setHistory(data as HistoryItem[]);
      } catch (e) {
        console.warn('Could not load history');
      }
      setLoading(false);
    };
    load();
  }, []);

  const intensityEmoji: Record<string, string> = {
    suave: '🟡',
    medio: '🟠',
    intenso: '🔴',
  };

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
        <h1 className="text-2xl font-extrabold text-white ml-2">Historial</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-[#E0E0E0]/40">Cargando...</p>
      ) : history.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-[#E0E0E0]/50 text-lg">Aún no jugaron nada</p>
          <p className="text-[#E0E0E0]/30 text-sm mt-2">¡Volvé al inicio y empezá!</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-6 bg-[#FF6B6B] text-white font-bold px-6 py-3 rounded-xl"
          >
            🎲 Jugar ahora
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-w-lg mx-auto">
          {history.map((item) => {
            const catInfo = CATEGORY_INFO[item.game_category as GameCategory];
            return (
              <div key={item.id} className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-4 flex items-center gap-4">
                <div className="text-2xl">{catInfo?.emoji || '🎮'}</div>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{item.game_title}</p>
                  <p className="text-xs text-[#E0E0E0]/40 mt-0.5">
                    {intensityEmoji[item.intensity] || ''} {item.intensity} · {new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
