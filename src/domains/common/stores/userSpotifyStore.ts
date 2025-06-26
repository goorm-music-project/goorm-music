import { create } from "zustand";

interface SpotifyStore {
  accessToken: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  setUserId: (id: string) => void;
  setIsLoggedIn: (state: boolean) => void;
}

export const userSpotifyStore = create<SpotifyStore>((set) => ({
  accessToken: null,
  userId: null,
  isLoggedIn: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setUserId: (id) => set({ userId: id }),
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}));
