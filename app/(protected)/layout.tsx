"use client";

import { useAuthStore } from "@/app/store/auth";

export default function ProtectedLayout({
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

  // Middleware już sprawdził auth, po prostu renderuj
  return <>{children}</>;
}
