import { create } from 'zustand';
import type { Game, Intensity } from '../games/gameDatabase';

interface GameState {
  currentGame: Game | null;
  selectedIntensity: Intensity | null;
  playedGameIds: string[];
  showCelebration: boolean;

  setCurrentGame: (game: Game | null) => void;
  setSelectedIntensity: (intensity: Intensity | null) => void;
  addPlayedGame: (gameId: string) => void;
  setPlayedGameIds: (ids: string[]) => void;
  setShowCelebration: (show: boolean) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  selectedIntensity: null,
  playedGameIds: [],
  showCelebration: false,

  setCurrentGame: (game) => set({ currentGame: game, selectedIntensity: null }),
  setSelectedIntensity: (intensity) => set({ selectedIntensity: intensity }),
  addPlayedGame: (gameId) => set((state) => ({
    playedGameIds: [...state.playedGameIds, gameId],
  })),
  setPlayedGameIds: (ids) => set({ playedGameIds: ids }),
  setShowCelebration: (show) => set({ showCelebration: show }),
  reset: () => set({
    currentGame: null,
    selectedIntensity: null,
    showCelebration: false,
  }),
}));
