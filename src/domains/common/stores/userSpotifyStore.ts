import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpotifyStore {
  userId: string | null;
  isLoggedIn: boolean;
  setUserId: (id: string) => void;
  setIsLoggedIn: (state: boolean) => void;
}

export const userSpotifyStore = create<SpotifyStore>()(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (id) => set({ userId: id }),
      setIsLoggedIn: (state) => set({ isLoggedIn: state }),
    }),
    {
      name: "spotify-user-storage", // localStorage key
      partialize: (state) => ({
        userId: state.userId,
        isLoggedIn: state.isLoggedIn,
      }), // 저장할 항목만 선택
    }
  )
);
