import React from "react";
import HeroImage from "@/public/sign-up-hero.jpg";
import { UserAuthView } from "@/components/ui/view/UserAuthView";

import { SignInForm } from "@/components/ui/form/SignInForm";

export default function SignInPage() {
  return (
    <UserAuthView
      image={HeroImage}
      title="Login to Your Account"
      subtitle="Log in to your account and Start Creating, Collecting And Selling Nfts."
    >
      <SignInForm />
    </UserAuthView>
  );
}
