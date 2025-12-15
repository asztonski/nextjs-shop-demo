"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import UserIcon from "@/public/buttons/user-dark.svg";
import EnvelopeIcon from "@/public/buttons/envelope-dark.svg";
import LockIcon from "@/public/buttons/lock.svg";
import {
  validateConfirmPassword,
  validatePassword,
  validateUsername,
  validateEmail,
  createValidationHandler,
} from "@/helpers/useFormValidation";
import {
  handleRegisterSubmit,
  RegisterFormData,
} from "@/helpers/ui/formHandlers";

export const SignUpForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const TIMEOUT = 200;

  // Create validation handlers using the universal function
  const handleUsernameValidation = createValidationHandler(
    validateUsername,
    setIsUsernameValid,
    TIMEOUT
  );

  const handleEmailValidation = createValidationHandler(
    validateEmail,
    setIsEmailValid,
    TIMEOUT
  );

  const handlePasswordValidation = createValidationHandler(
    validatePassword,
    setIsPasswordValid,
    TIMEOUT
  );

  const handleConfirmPasswordValidation = createValidationHandler(
    validateConfirmPassword,
    setIsConfirmPasswordValid,
    TIMEOUT
  );

  const DELAY_TIME = 1500;

  const FORM_ITEMS = [
    {
      placeholder: "Username",
      name: "username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (!isUsernameValid) {
          setTimeout(() => {
            handleUsernameValidation(e.target.value);
          }, DELAY_TIME);
        }
      },
      onBlur: () => handleUsernameValidation(username),
      icon: UserIcon,
      type: "text",
      errorMessage:
        "Username must be 3-20 characters long, start with uppercase letter, rest lowercase letters or numbers",
      isValid: isUsernameValid,
    },
    {
      placeholder: "Email address",
      name: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (!isEmailValid) {
          setTimeout(() => {
            handleEmailValidation(e.target.value);
          }, DELAY_TIME);
        }
      },
      onBlur: () => handleEmailValidation(email),
      icon: EnvelopeIcon,
      type: "email",
      errorMessage: "Invalid email address",
      isValid: isEmailValid,
    },
    {
      placeholder: "Password",
      name: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (!isPasswordValid) {
          setTimeout(() => {
            handlePasswordValidation(e.target.value);
          }, DELAY_TIME);
        }
      },
      onBlur: () => handlePasswordValidation(password),
      icon: LockIcon,
      type: "password",
      errorMessage: "Minimum 8 characters, at least 1 letter and 1 number",
      isValid: isPasswordValid,
    },
    {
      placeholder: "Confirm Password",
      name: "confirmPassword",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        handleConfirmPasswordValidation(password, e.target.value);
      },
      onBlur: () => handleConfirmPasswordValidation(password, confirmPassword),
      icon: LockIcon,
      type: "password",
      errorMessage: "Passwords do not match",
      isValid: isConfirmPasswordValid,
    },
  ];

  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  const isFormFilled = username && email && password && confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: RegisterFormData = {
      username,
      email,
      password,
      confirmPassword,
    };

    const validationHandlers = {
      handleUsernameValidation,
      handleEmailValidation,
      handlePasswordValidation,
      handleConfirmPasswordValidation,
    };

    await handleRegisterSubmit({
      formData,
      validationHandlers,
      setIsSubmitting,
      setSubmitError,
      router,
    });
  };

  const isDisabled =
    !isFormValid || isSubmitting || !isFormFilled || submitError !== "";

  useEffect(() => {
    if (submitError || isSubmitting) {
      const timer = setTimeout(() => {
        setSubmitError("");
        setIsSubmitting(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitError, isSubmitting]);

  return (
    <div className="lg:w-3/4 lg:h-105">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-8 lg:mt-10 w-full"
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
            isValid,
            onBlur,
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
              isInvalid={!isValid}
              errorMessage={errorMessage}
              onBlur={onBlur}
              ariaInvalid={isValid}
            />
          )
        )}
        <Button isDisabled={isDisabled} className="py-3 !w-full" type="submit">
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
        {/* Wyświetl błąd jeśli wystąpił */}
      </form>
      <p
        className={`text-red-500 mt-2 ease-in-out duration-300 ${
          submitError ? "opacity-100" : "opacity-0"
        }`}
        role="alert"
      >
        {submitError ? submitError : "."}
      </p>
    </div>
  );
};
