"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import HeroImage from "@/public/sign-up-hero.jpg";

export default function ActivationRequiredPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      // Sprawdź token z URL
      const token = searchParams.get("token");

      if (token) {
        try {
          // Opcjonalnie: zweryfikuj token przez API
          // const response = await fetch(`/api/verify-activation-access?token=${token}`);
          // if (!response.ok) throw new Error("Invalid token");

          // Jeśli token jest OK, zapisz w sessionStorage dla odświeżenia strony
          sessionStorage.setItem("activationAccessToken", token);
          setIsAuthorized(true);
        } catch (error) {
          console.error("Token verification failed:", error);
          router.push("/sign-in");
          return;
        }
      } else {
        // Sprawdź sessionStorage (fallback dla odświeżenia strony)
        const savedToken = sessionStorage.getItem("activationAccessToken");
        const pendingEmail = sessionStorage.getItem("pendingActivation");

        if (savedToken || pendingEmail) {
          setIsAuthorized(true);
          if (pendingEmail) {
            setEmail(pendingEmail);
          }
        } else {
          // Brak dostępu - przekieruj na sign-in
          router.push("/sign-in");
          return;
        }
      }
    };

    verifyAccess();
  }, [searchParams, router]);

  if (!isAuthorized) {
    return null; // Router przekieruje
  }

  return (
    <UserAuthView
      image={HeroImage}
      title="Activation link sent!"
      subtitle={
        email
          ? `Please check your email (${email}) to activate your account.`
          : "Please check your email to activate your account."
      }
    />
  );
}
