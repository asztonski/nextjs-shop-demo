"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import { ButtonLink } from "@/components/ui/link/Link";
import HeroImage from "@/public/sign-up-hero.jpg";

export default function AccountActivatedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get("token");
      const serverError = searchParams.get("error");

      // If there's already an error from server redirect
      if (serverError) {
        setError(decodeURIComponent(serverError));
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // If no token, check if already activated
      if (!token) {
        const savedToken = sessionStorage.getItem("accountActivatedToken");
        if (savedToken) {
          setIsAuthorized(true);
          setIsLoading(false);
        } else {
          router.push("/sign-in");
        }
        return;
      }

      // ✅ KLUCZ: Wywołaj backend API do aktywacji konta
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/activate/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          // ✅ Sukces - konto aktywowane
          setUsername(data.username);
          setIsAuthorized(true);
          sessionStorage.setItem("accountActivatedToken", token);

          // Wyczyść tokeny po aktywacji
          sessionStorage.removeItem("activationAccessToken");
          sessionStorage.removeItem("pendingActivation");
        } else {
          // ❌ Błąd aktywacji
          setError(data.error || "Activation failed");
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Activation failed:", error);
        setError(
          "Failed to activate account. Please try again or contact support."
        );
        setIsAuthorized(true);
      } finally {
        setIsLoading(false);
      }
    };

    activateAccount();
  }, [searchParams, router]);

  // Loading state
  if (isLoading) {
    return (
      <UserAuthView
        image={HeroImage}
        title="Activating Your Account..."
        subtitle="Please wait while we activate your account."
      >
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </UserAuthView>
    );
  }

  // Not authorized
  if (!isAuthorized) {
    return null;
  }

  // Error state
  if (error) {
    return (
      <UserAuthView
        image={HeroImage}
        title="Activation Failed"
        subtitle={`${error}`}
      ></UserAuthView>
    );
  }

  // Success state
  return (
    <UserAuthView
      image={HeroImage}
      title="Account Activated!"
      subtitle={
        username
          ? `Welcome ${username}! Your account has been successfully activated. You can now sign in.`
          : "Your account has been successfully activated. You can now sign in to your account."
      }
    >
      <ButtonLink href="/sign-in" className="mt-4">
        Sign In
      </ButtonLink>
    </UserAuthView>
  );
}
