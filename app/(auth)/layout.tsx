"use client";

import { useAuthStore } from "@/app/store/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHydrated } = useAuthStore();

  // Pokaż loading podczas hydratacji
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Middleware już obsługuje przekierowanie zalogowanych użytkowników
  // Po prostu renderuj formularz
  return <>{children}</>;
}
