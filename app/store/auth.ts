import { create } from "zustand";

interface AuthState {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedIn) => set({ isUserLoggedIn: loggedIn }),
}));
