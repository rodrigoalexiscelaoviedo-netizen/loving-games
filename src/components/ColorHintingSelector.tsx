import { useState } from 'react';
import type { Intensity } from '../games/gameDatabase';

interface Props {
  onStart: (theme: string, difficulty: Intensity) => void;
  onBack: () => void;
}

const THEMES = [
  { id: 'colores', label: 'Colores', emoji: '🎨', description: 'Busca colores' },
  { id: 'naturaleza', label: 'Naturaleza', emoji: '🌿', description: 'Elementos naturales' },
  { id: 'urbano', label: 'Urbano', emoji: '🏙️', description: 'Arte y arquitectura' },
  { id: 'retro', label: 'Retro', emoji: '📼', description: 'Cosas del pasado' },
  { id: 'emociones', label: 'Emociones', emoji: '💫', description: 'Lo que sientes' },
];

const DIFFICULTIES: Array<{ key: Intensity; emoji: string; label: string; description: string }> = [
  { key: 'suave', emoji: '🟡', label: 'Fácil', description: 'Comunes' },
  { key: 'medio', emoji: '🟠', label: 'Medio', description: 'Desafiante' },
  { key: 'intenso', emoji: '🔴', label: 'Difícil', description: 'Muy desafiante' },
];

export function ColorHintingSelector({ onStart, onBack }: Props) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Intensity | null>(null);

  const handleStart = () => {
    if (selectedTheme && selectedDifficulty) {
      onStart(selectedTheme, selectedDifficulty);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0F0F1E] text-[#E0E0E0] flex flex-col px-4 py-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="text-[#E0E0E0]/50 hover:text-white text-xl p-2 self-start mb-4"
      >
        ← Volver
      </button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#00D4AA] mb-2">🎨 Colors Hinting</h1>
        <p className="text-[#E0E0E0]/50 text-sm">Elige tema y dificultad</p>
      </div>

      {/* Tema Selection */}
      <div className="mb-10">
        <p className="text-sm font-bold text-[#E0E0E0] mb-4 uppercase tracking-wider">Tema</p>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                p-4 rounded-xl transition-all text-center
                ${selectedTheme === theme.id
                  ? 'bg-[#00D4AA] text-[#0F0F1E] scale-105 shadow-lg'
                  : 'bg-[#1A1A2E] border border-[#2A2A3E] text-[#E0E0E0] hover:border-[#00D4AA]'
                }
              `}
            >
              <div className="text-3xl mb-2">{theme.emoji}</div>
              <p className="text-xs font-bold">{theme.label}</p>
              <p className="text-[10px] text-[#E0E0E0]/50 mt-1">{theme.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      {selectedTheme && (
        <div className="mb-10">
          <p className="text-sm font-bold text-[#E0E0E0] mb-4 uppercase tracking-wider">Dificultad</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            {DIFFICULTIES.map(({ key, emoji, label, description }) => (
              <button
                key={key}
                onClick={() => setSelectedDifficulty(key)}
                className={`
                  flex-1 p-3 rounded-lg transition-all text-center text-xs
                  ${selectedDifficulty === key
                    ? 'bg-[#FF6B6B] text-white scale-105 shadow-lg font-bold'
                    : 'bg-[#1A1A2E] border border-[#2A2A3E] text-[#E0E0E0] hover:border-[#FF6B6B]'
                  }
                `}
              >
                <div className="text-xl mb-1">{emoji}</div>
                <p className="font-bold">{label}</p>
                <p className="text-[9px] text-[#E0E0E0]/50">{description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Button */}
      {selectedTheme && selectedDifficulty && (
        <button
          onClick={handleStart}
          className="
            w-full max-w-sm mx-auto bg-[#00D4AA] hover:bg-[#00D4AA]/90
            text-[#0F0F1E] font-extrabold py-4 rounded-xl text-lg
            shadow-lg shadow-[#00D4AA]/20
          "
        >
          🚀 ¡Comenzar búsqueda!
        </button>
      )}
    </div>
  );
}
