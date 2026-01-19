import React from "react";
import { UserAuthView } from "@/components/ui/view/UserAuthView";
import HeroImage from "@/public/sign-up-hero.jpg";
import { ResendActivationForm } from "@/components/ui/form/ResendActivationForm";

export default function ResendActivationPage() {
  return (
    <UserAuthView
      image={HeroImage}
      title="Resend Activation Link"
      subtitle="Enter your email address and we'll send you a new activation link."
    >
      <ResendActivationForm />
    </UserAuthView>
  );
}
