import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  selectedTrackId: string | null;
  setSelectedTrackId: (id: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      selectedTrackId: null,
      setSelectedTrackId: (id) => set({ selectedTrackId: id }),
    }),
    {
      name: "player-storage",
      partialize: (state) => ({
        selectedTrackId: state.selectedTrackId,
      }),
    }
  )
);
