import { create } from "zustand";

interface SpotifyStore {
  accessToken: string | null;
  userId: string | null;
  setAccessToken: (token: string) => void;
  setUserId: (id: string) => void;
  // reset: () => void;
}

export const userSpotifyStore = create<SpotifyStore>((set) => ({
  accessToken: null,
  userId: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUserId: (id) => set({ userId: id }),
  // reset: () => set({ accessToken: null, userId: null }),
}));
