import React from "react";
import Image from "next/image";
import HeroImage from "@/public/sign-up-hero.jpg";
import { SignUpForm } from "@/components/ui/form/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-15 lg:x-auto w-full lg:w-auto py-6 lg:py-0">
      <div className="w-full lg:flex-1 relative h-96 lg:h-auto">
        <Image
          src={HeroImage}
          alt="Sign Up"
          fill
          className="object-cover"
          priority
          // sizes="(max-width: 768px) 200vw, 40vw"
        />
      </div>
      <div className="lg:flex-1 max-w-sm mx-auto lg:max-w-none px-4 lg:px-0">
        <div className="py-4 lg:py-24 lg:max-w-md w-full mx-auto lg:mx-0">
          <h1 className="text-4xl lg:text-5xl font-semibold">Create Account</h1>
          <h2 className="text-base lg:text-box-subtitle mt-6">
            Welcome! Enter Your Details And Start Creating, Collecting And
            Selling Nfts.
          </h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
