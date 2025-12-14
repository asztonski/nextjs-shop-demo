"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import HeroImage from "@/public/sign-up-hero.jpg";
import { Button } from "@/components/ui/button/Button";
import { resendActivationLink } from "@/helpers/auth/resendActivationLink";
import { ButtonLink } from "@/components/ui/link/Link";

export default function ActivationRequiredPage() {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivationRequiredPageInner router={router} />
    </Suspense>
  );
}

function ActivationRequiredPageInner({
  router,
}: {
  router: ReturnType<typeof useRouter>;
}) {
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = () => {
      const token = searchParams.get("token");

      if (token) {
        sessionStorage.setItem("activationAccessToken", token);
        setIsAuthorized(true);
      } else {
        const savedToken = sessionStorage.getItem("activationAccessToken");
        const pendingEmail = sessionStorage.getItem("pendingActivation");

        if (savedToken || pendingEmail) {
          setIsAuthorized(true);
          if (pendingEmail) {
            setEmail(pendingEmail);
          }
        } else {
          router.push("/sign-in");
          return;
        }
      }
    };

    verifyAccess();
  }, [searchParams, router]);

  const handleResend = async () => {
    if (!email) {
      setMessage("Email address not found");
      return;
    }

    setIsResending(true);
    setMessage(null);

    try {
      const result = await resendActivationLink(email);

      if (result.success) {
        setMessage("Activation link has been sent successfully!");
      } else {
        setMessage(result.error || "Failed to send activation link");
      }
    } catch (error) {
      setMessage(`An error occurred. Please try again. ${error}`);
    } finally {
      setIsResending(false);
    }
  };

  if (!isAuthorized) {
    return null;
  }

  const isError = message && !message.includes("success");

  return (
    <UserAuthView
      image={HeroImage}
      title="Activation link sent!"
      subtitle={
        email
          ? `Please check your email (${email}) to activate your account. If you did not receive the email, please check your spam folder.`
          : "Please check your email to activate your account. If you did not receive the email, please check your spam folder."
      }
    >
      <div className="mt-4">
        {!isError ? (
          <div>
            <p>Not received the email?</p>
            <Button
              className="mt-2 py-3"
              onClick={handleResend}
              isDisabled={isResending || !email}
            >
              {isResending ? "Sending..." : "Resend"}
            </Button>
            <p className={`mt-3 text-sm text-green-600`}>{message}</p>
          </div>
        ) : (
          <div>
            <p className={`text-sm text-red-500`}>{message}</p>
            <ButtonLink className="mt-3" href="/sign-up">
              Sign up
            </ButtonLink>
          </div>
        )}
      </div>
    </UserAuthView>
  );
}
