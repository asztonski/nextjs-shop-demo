import React from "react";
import { redirect } from "next/navigation";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import { ButtonLink } from "@/components/ui/link/Link";
import HeroImage from "@/public/sign-up-hero.jpg";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface AccountActivatedPageProps {
  searchParams: SearchParams;
}

async function activateAccount(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/activate/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ważne: nie cache'uj tego requesta
      }
    );

    if (!response.ok) {
      throw new Error("Activation request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Activation failed:", error);
    return {
      success: false,
      error: "Failed to activate account. Please try again or contact support.",
    };
  }
}

export default async function AccountActivatedPage({
  searchParams,
}: AccountActivatedPageProps) {
  const params = await searchParams;
  const token = params.token as string | undefined;
  const serverError = params.error as string | undefined;

  // Jeśli jest błąd z serwera
  if (serverError) {
    return (
      <UserAuthView
        image={HeroImage}
        title="Activation Failed"
        subtitle={decodeURIComponent(serverError)}
      />
    );
  }

  // Jeśli brak tokenu - przekieruj do sign-in
  if (!token) {
    redirect("/sign-in");
  }

  // Aktywuj konto na serwerze
  const result = await activateAccount(token);

  // Jeśli błąd aktywacji
  if (!result.success) {
    return (
      <UserAuthView
        image={HeroImage}
        title="Activation Failed"
        subtitle={result.error || "Activation failed"}
      />
    );
  }

  // Sukces - konto aktywowane
  return (
    <UserAuthView
      image={HeroImage}
      title="Account Activated!"
      subtitle={
        result.username
          ? `Welcome ${result.username}! Your account has been successfully activated. You can now sign in.`
          : "Your account has been successfully activated. You can now sign in to your account."
      }
    >
      <ButtonLink href="/sign-in" className="mt-4">
        Sign In
      </ButtonLink>
    </UserAuthView>
  );
}
