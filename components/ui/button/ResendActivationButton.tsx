"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { resendActivationLink } from "@/helpers/auth/resendActivationLink";

interface ResendActivationButtonProps {
  email: string;
}

export function ResendActivationButton({ email }: ResendActivationButtonProps) {
  const [isResending, setIsResending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

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

  return (
    <div className="mt-4">
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
    </div>
  );
}
