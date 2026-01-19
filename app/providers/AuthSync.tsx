// AuthSync.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";

export function AuthSync() {
  const { token, tokenExpiry, logout, isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated || !token || !tokenExpiry) return;

    const timeUntilExpiry = tokenExpiry - Date.now();
    const timeout = setTimeout(() => {
      logout();
      router.push("/sign-in");
    }, timeUntilExpiry);

    return () => clearTimeout(timeout);
  }, [token, tokenExpiry, isHydrated, logout, router]);

  return null;
}
