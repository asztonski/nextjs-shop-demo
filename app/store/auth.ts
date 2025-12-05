// HERE WE DEFINE A ZUSTAND STORE FOR AUTHENTICATION MANAGEMENT
// IT HANDLES TOKEN STORAGE, LOGIN/LOGOUT, TOKEN VALIDATION, AND EXPIRY CHECKING

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Frontend - auth.ts
interface AuthState {
  token: string | null;
  tokenExpiry: number | null; // timestamp wygaśnięcia
  isUserLoggedIn: boolean;
  isHydrated: boolean;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  setHydrated: () => void;
  isTokenExpired: () => boolean; // ✅ Sprawdź lokalnie
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      tokenExpiry: null,
      isUserLoggedIn: false,
      isHydrated: false,

      login: (token: string) => {
        // Dekoduj JWT i wyciągnij exp (bez weryfikacji!)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp * 1000; // konwersja na ms

        if (typeof window !== "undefined") {
          // Usuń secure flag dla localhost (działa tylko na HTTPS)
          document.cookie = `auth-token=${token}; path=/; samesite=strict`;
        }

        set({
          token,
          tokenExpiry: expiry,
          isUserLoggedIn: true,
        });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
        set({
          token: null,
          tokenExpiry: null,
          isUserLoggedIn: false,
        });
      },

      isTokenExpired: () => {
        const { tokenExpiry } = get();
        if (!tokenExpiry) return true;
        return Date.now() >= tokenExpiry;
      },

      setToken: (token) =>
        set({
          token,
          isUserLoggedIn: token !== null,
        }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        tokenExpiry: state.tokenExpiry,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // ✅ Przywróć isUserLoggedIn na podstawie tokenu
          if (state.token && state.tokenExpiry) {
            // Sprawdź czy token nie wygasł
            if (state.isTokenExpired()) {
              state.logout();
              // Tutaj mogę dodać dodatkową logikę, np. przekierowanie, wyświetlić modal itp.
            } else {
              // Token istnieje i jest ważny
              state.setToken(state.token);
            }
          }
          state.setHydrated();
        }
      },
    }
  )
);
