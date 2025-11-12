import React from "react";
import HeroImage from "@/public/sign-up-hero.jpg";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import { SignUpForm } from "@/components/ui/form/SignUpForm";

export default function SignUpPage() {
  return (
    <UserAuthView
      image={HeroImage}
      title="Create Account"
      subtitle="Welcome! Enter Your Details And Start Creating, Collecting And Selling Nfts."
    >
      <SignUpForm />
    </UserAuthView>
  );
}
