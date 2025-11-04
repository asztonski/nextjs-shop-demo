"use client";
import { useState } from "react";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import UserIcon from "@/public/buttons/user-dark.svg";
import EnvelopeIcon from "@/public/buttons/envelope-dark.svg";
import LockIcon from "@/public/buttons/lock.svg";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FORM_ITEMS = [
    {
      placeholder: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      icon: UserIcon,
    },
    {
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      icon: EnvelopeIcon,
    },
    {
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      icon: LockIcon,
      type: "password",
    },
    {
      placeholder: "Confirm Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      icon: LockIcon,
      type: "password",
    },
  ];

  return (
    <form className="flex flex-col gap-4 mt-6 w-3/4" action="">
      {FORM_ITEMS.map(({ placeholder, value, onChange, icon, type }) => (
        <TextField
          key={placeholder}
          icon={icon}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          className="h-11"
        />
      ))}
      <Button className="py-3 mt-2 !w-full" type="submit">
        Create Account
      </Button>
    </form>
  );
};
