"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import EnvelopeIcon from "@/public/buttons/envelope-dark.svg";
import LockIcon from "@/public/buttons/lock.svg";
import { handleLoginSubmit } from "@/helpers/ui/formHandlers";
import Link from "next/link";

export const SignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const FORM_ITEMS = [
    {
      placeholder: "Email address",
      name: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => (
        setEmail(e.target.value), setSubmitError("")
      ),
      icon: EnvelopeIcon,
      type: "email",
      errorMessage: "Invalid email address",
    },
    {
      placeholder: "Password",
      name: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => (
        setPassword(e.target.value), setSubmitError("")
      ),
      icon: LockIcon,
      type: "password",
      errorMessage: "Minimum 8 characters, at least 1 letter and 1 number",
    },
  ];

  const isFormFilled = email && password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLoginSubmit({
      formData: { email, password },
      setIsSubmitting: setIsLoggingIn,
      setSubmitError,
      router,
    });
  };

  useEffect(() => {
    if (submitError || isLoggingIn) {
      const timer = setTimeout(() => {
        setSubmitError("");
        setIsLoggingIn(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitError, isLoggingIn]);

  return (
    <div className="lg:w-3/4 lg:h-88">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-1 mt-8 lg:mt-10 w-full`}
      >
        {FORM_ITEMS.map(
          ({
            placeholder,
            name,
            value,
            onChange,
            icon,
            type,
            errorMessage,
          }) => (
            <TextField
              key={placeholder}
              icon={icon}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              className="h-11 lg:h-12"
              inputClassName="w-2/3 lg:w-9/10"
              errorMessage={errorMessage}
            />
          )
        )}
        <Button
          isDisabled={isLoggingIn || !isFormFilled || submitError !== ""}
          className="py-3 !w-full"
          type="submit"
        >
          {isLoggingIn ? "Logging In..." : "Log In"}
        </Button>

        {/* Wyświetl błąd jeśli wystąpił */}
      </form>
      <p className="flex gap-1 mt-4 mx-auto w-max">
        <span>Don&apos;t have an account?</span>
        <Link className="text-accent hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <p
        className={`text-red-500 mt-2 mx-auto w-max ease-in-out duration-300 ${
          submitError ? "opacity-100" : "opacity-0"
        }`}
        role="alert"
      >
        {submitError ? submitError : "."}
      </p>
    </div>
  );
};
