"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isUserLoggedIn, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !isUserLoggedIn) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj na sign-in
      router.push("/sign-in");
    }
  }, [isUserLoggedIn, isHydrated, router]);

  // Pokaż loading podczas hydratacji
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Jeśli użytkownik nie jest zalogowany, nie pokazuj chronionych stron
  if (!isUserLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
