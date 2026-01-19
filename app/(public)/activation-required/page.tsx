import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import HeroImage from "@/public/sign-up-hero.jpg";
import { ResendActivationButton } from "@/components/ui/button/ResendActivationButton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface ActivationRequiredPageProps {
  searchParams: SearchParams;
}

export default async function ActivationRequiredPage({
  searchParams,
}: ActivationRequiredPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  // Get access token and email from cookies
  const accessToken = cookieStore.get("activation_access")?.value;
  const email =
    (params.email as string | undefined) ||
    cookieStore.get("activation_email")?.value;

  // Validate access token
  if (!accessToken) {
    // No access token - user accessed directly via URL
    redirect("/sign-in");
  }

  // Validate token format and age (token format: randomString.timestamp)
  const [tokenValue, timestamp] = accessToken.split(".");
  if (!tokenValue || !timestamp) {
    // Invalid token format
    redirect("/sign-in");
  }

  // Check if token is still valid (5 minutes = 300000ms)
  const tokenAge = Date.now() - parseInt(timestamp);
  if (tokenAge > 5 * 60 * 1000) {
    // Token expired
    redirect("/sign-in");
  }

  // If no email, redirect to sign-in
  if (!email) {
    redirect("/sign-in");
  }

  // Note: Access token will auto-expire after 5 minutes
  // No need to manually clear it here due to Next.js cookies restrictions

  return (
    <UserAuthView
      image={HeroImage}
      title="Activation link sent!"
      subtitle={`Please check your email (${email}) to activate your account. If you did not receive the email, please check your spam folder.`}
    >
      <ResendActivationButton email={email} />
    </UserAuthView>
  );
}
