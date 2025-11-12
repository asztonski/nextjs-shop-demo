import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isUserLoggedIn: boolean;
  isHydrated: boolean;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  setHydrated: () => void;
  validateToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isUserLoggedIn: false,
      isHydrated: false,

      setToken: (token) =>
        set({
          token,
          isUserLoggedIn: token !== null,
        }),

      login: (token: string) => {
        // Ustaw token w cookies dla middleware (jeśli pracuje w przeglądarce)
        if (typeof window !== "undefined") {
          document.cookie = `auth-token=${token}; path=/; secure; samesite=strict`;
        }

        set({
          token,
          isUserLoggedIn: token !== null,
        });
      },

      logout: () => {
        // Usuń token z cookies
        if (typeof window !== "undefined") {
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }

        set({
          token: null,
          isUserLoggedIn: false,
        });
      },

      validateToken: async () => {
        const { token } = get();
        if (!token) return false;

        try {
          // TODO: Wywołanie do Twojego backendu Node.js
          // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
          //   method: 'POST',
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //     'Content-Type': 'application/json'
          //   }
          // });

          // if (!response.ok) {
          //   get().logout();
          //   return false;
          // }

          // return true;

          // Tymczasowa implementacja
          return token.length > 0;
        } catch (error) {
          console.error("Token validation failed:", error);
          get().logout();
          return false;
        }
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        // Po załadowaniu z localStorage, ustaw isUserLoggedIn na podstawie tokenu
        if (state) {
          state.isUserLoggedIn = state.token !== null;

          // Ustaw token w cookies jeśli istnieje i jesteśmy w przeglądarce
          if (state.token && typeof window !== "undefined") {
            document.cookie = `auth-token=${state.token}; path=/; secure; samesite=strict`;
          }

          state.setHydrated();
        }
      },
    }
  )
);
