import React from "react";
import Image from "next/image";
import HeroImage from "@/public/sign-up-hero.jpg";
import { SignUpForm } from "@/components/ui/form/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex gap-15">
      <div className="flex-1 relative">
        <Image
          src={HeroImage}
          alt="Sign Up"
          fill
          className="object-cover"
          priority
          // sizes="(max-width: 768px) 200vw, 40vw"
        />
      </div>
      <div className="flex-1">
        <div className="max-w-md py-20">
          <h1 className="text-5xl font-semibold">Create Account</h1>
          <h2 className="text-box-subtitle mt-5">
            Welcome! Enter Your Details And Start Creating, Collecting And
            Selling Nfts.
          </h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
