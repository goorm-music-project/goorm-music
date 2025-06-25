import { create } from "zustand";

interface LikedStore {
  likedTracks: Set<string>;
  toggleLiked: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
  setLikedTracks: (trackIds: string[]) => void;
  fetchLiked: (trackId: string, liked: boolean) => void;
}

export const useLikedStore = create<LikedStore>((set, get) => ({
  likedTracks: new Set(),
  toggleLiked: (trackId) => {
    const current = get().likedTracks;
    const newSet = new Set(current);
    const liked = newSet.has(trackId);
    if (liked) {
      newSet.delete(trackId);
    } else {
      newSet.add(trackId);
    }
    set({ likedTracks: newSet });
    get().fetchLiked(trackId, !liked);
  },
  isLiked: (trackId) => get().likedTracks.has(trackId),
  setLikedTracks: (trackIds) => {
    set({ likedTracks: new Set(trackIds) });
  },
  fetchLiked: async (trackId, liked) => {
    try {
      await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, liked }),
      });
    } catch (err) {
      console.log("좋아요 서버 추가 살패", err);
    }
  },
}));
