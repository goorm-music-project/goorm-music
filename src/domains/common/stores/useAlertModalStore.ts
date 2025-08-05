import { create } from "zustand";

interface AlertModalState {
  message: string;
  showAlertModal: boolean;
  setMessage: (text: string) => void;
  setShowAlertModal: (val: boolean) => void;
}

export const useAlertModalStore = create<AlertModalState>((set) => ({
  message: "",
  showAlertModal: false,
  setMessage: (text: string) => set({ message: text }),
  setShowAlertModal: (val: boolean) => set({ showAlertModal: val }),
}));
