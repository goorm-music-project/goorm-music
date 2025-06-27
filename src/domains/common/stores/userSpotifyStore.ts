import { create } from "zustand";

interface SpotifyStore {
  userId: string | null;
  isLoggedIn: boolean;
  setUserId: (id: string) => void;
  setIsLoggedIn: (state: boolean) => void;
}

export const userSpotifyStore = create<SpotifyStore>((set) => ({
  userId: null,
  isLoggedIn: false,
  setUserId: (id) => set({ userId: id }),
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}));
