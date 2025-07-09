import { create } from "zustand";
import { Playlist } from "../types/Playlist";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlaylistStore {
  playlistStore: Playlist[];
  setPlaylistsStore: (list: Playlist[]) => void;
  // clearPlaylistsStore: () => void;
}

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set) => ({
      playlistStore: [],
      setPlaylistsStore(list) {
        set({ playlistStore: list });
      },
    }),
    {
      name: "playlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
