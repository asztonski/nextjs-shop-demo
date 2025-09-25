import React from "react";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}
