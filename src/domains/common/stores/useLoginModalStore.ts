import { create } from "zustand";
interface LoginModalState {
  showLoginModal: boolean;
  setShowLoginModal: (val: boolean) => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  showLoginModal: false,
  setShowLoginModal: (val: boolean) => set({ showLoginModal: val }),
}));
