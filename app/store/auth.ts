import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isUserLoggedIn: boolean;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isUserLoggedIn: false,

      setToken: (token) =>
        set({
          token,
        }),

      login: (token: string) => {
        set({
          token,
          isUserLoggedIn: token !== null,
        });
      },

      logout: () => {
        set({
          token: null,
          isUserLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        // Po załadowaniu z localStorage, ustaw isUserLoggedIn na podstawie tokenu
        if (state) {
          state.isUserLoggedIn = state.token !== null;
        }
      },
    }
  )
);
