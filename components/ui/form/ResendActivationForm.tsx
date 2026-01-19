"use client";

import React, { useState } from "react";
import { TextField } from "@/components/ui/input/TextField";
import { Button } from "@/components/ui/button/Button";
import EnvelopeIcon from "@/public/buttons/envelope-dark.svg";
import { resendActivationLink } from "@/helpers/auth/resendActivationLink";
import Link from "next/link";

export function ResendActivationForm() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsResending(true);
    setMessage(null);

    try {
      const result = await resendActivationLink(email);

      if (result.success) {
        setMessage({
          text: "Activation link has been sent successfully! Please check your email.",
          type: "success",
        });
        setEmail("");
      } else {
        setMessage({
          text:
            result.error || "Failed to send activation link. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: `An error occurred. Please try again. ${error}`,
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="lg:w-3/4 lg:h-88">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 mt-8 lg:mt-10 w-full"
      >
        <TextField
          icon={EnvelopeIcon}
          placeholder="Email address"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage(null);
          }}
          type="email"
          className="h-11 lg:h-12"
          inputClassName="w-2/3 lg:w-9/10"
          errorMessage="Invalid email address"
        />

        <Button
          isDisabled={isResending || !email}
          className="py-3 !w-full"
          type="submit"
        >
          {isResending ? "Sending..." : "Send Activation Link"}
        </Button>
      </form>

      <p className="flex gap-1 mt-4 mx-auto w-max">
        <span>Don&apos;t have an account?</span>
        <Link className="text-accent hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      {message && (
        <div
          className={`text-sm mt-4 mx-auto ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
