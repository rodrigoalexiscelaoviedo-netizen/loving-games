import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getGameHistory } from '../lib/supabase';

export function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getGameHistory(20);
      setHistory(data);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light p-4">
      <button
        onClick={() => navigate({ to: '/' })}
        className="mb-6 text-light/60 hover:text-light"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold text-coral mb-6">Historial</h1>

      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-light/60">Aún no han jugado. ¡Comiencen!</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-mid p-4 rounded-lg">
              <p className="font-semibold text-coral">{item.game_title}</p>
              <p className="text-xs text-light/60">
                {item.intensity} • {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
