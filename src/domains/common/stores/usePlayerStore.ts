import { create } from "zustand";

interface PlayerState {
  selectedTrackId: string | null;
  setSelectedTrackId: (id: string) => void;
}

export const usePlayerSotre = create<PlayerState>((set) => ({
  selectedTrackId: null,
  setSelectedTrackId: (id) => set({ selectedTrackId: id }),
}));
