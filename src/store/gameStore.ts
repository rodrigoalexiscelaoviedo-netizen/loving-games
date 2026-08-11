import { create } from 'zustand';
import type { Game, Intensity } from '../games/gameDatabase';

interface GameState {
  currentGame: Game | null;
  selectedIntensity: Intensity | null;
  gameContent: string;
  playedGameIds: string[];

  setCurrentGame: (game: Game | null) => void;
  setSelectedIntensity: (intensity: Intensity) => void;
  setGameContent: (content: string) => void;
  addPlayedGame: (gameId: string) => void;
  setPlayedGameIds: (ids: string[]) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentGame: null,
  selectedIntensity: null,
  gameContent: '',
  playedGameIds: [],

  setCurrentGame: (game) => set({ currentGame: game }),
  setSelectedIntensity: (intensity) => set({ selectedIntensity: intensity }),
  setGameContent: (content) => set({ gameContent: content }),
  addPlayedGame: (gameId) => set((state) => ({
    playedGameIds: [...state.playedGameIds, gameId],
  })),
  setPlayedGameIds: (ids) => set({ playedGameIds: ids }),
  reset: () => set({
    currentGame: null,
    selectedIntensity: null,
    gameContent: '',
  }),
}));
