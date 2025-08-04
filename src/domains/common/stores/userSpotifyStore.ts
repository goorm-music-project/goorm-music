import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpotifyStore {
  userId: string | null;
  isLoggedIn: boolean;
  product: string | null;
  setUserId: (id: string) => void;
  setIsLoggedIn: (state: boolean) => void;
  setProduct: (product: string) => void;
}

export const userSpotifyStore = create<SpotifyStore>()(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      product: null, // free, premium
      setUserId: (id) => set({ userId: id }),
      setIsLoggedIn: (state) => set({ isLoggedIn: state }),
      setProduct: (product) => set({ product }),
    }),
    {
      name: "spotify-user-storage", // localStorage key
      partialize: (state) => ({
        userId: state.userId,
        isLoggedIn: state.isLoggedIn,
        product: state.product,
      }), // 저장할 항목만 선택
    }
  )
);
