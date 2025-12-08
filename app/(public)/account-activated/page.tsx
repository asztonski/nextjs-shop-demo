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
  const [isLoading, setIsLoading] = useState(true); // Dodaj loading state

  useEffect(() => {
    const verifyAccess = async () => {
      const token = searchParams.get("token");
      const serverError = searchParams.get("error");

      if (serverError) {
        setError(decodeURIComponent(serverError));
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      if (token) {
        try {
          sessionStorage.setItem("accountActivatedToken", token);
          setIsAuthorized(true);

          // Wyczyść tokeny po aktywacji
          sessionStorage.removeItem("activationAccessToken");
          sessionStorage.removeItem("pendingActivation");
        } catch (error) {
          console.error("Token verification failed:", error);
          setError("Failed to verify activation token");
          setIsAuthorized(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        const savedToken = sessionStorage.getItem("accountActivatedToken");

        if (savedToken) {
          setIsAuthorized(true);
          setIsLoading(false);
        } else {
          router.push("/sign-in");
        }
      }
    };

    verifyAccess();
  }, [searchParams, router]);

  if (isLoading || !isAuthorized) {
    return null; // Lub loading spinner
  }

  return (
    <UserAuthView
      image={HeroImage}
      title={error ? "Activation Failed" : "Account Activated!"}
      subtitle={
        error
          ? `There was a problem activating your account: ${error}`
          : "Your account has been successfully activated. You can now sign in to your account."
      }
    >
      <ButtonLink href="/sign-in" className="mt-4">
        Sign In
      </ButtonLink>
    </UserAuthView>
  );
}
