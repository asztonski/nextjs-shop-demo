import type { Metadata } from "next";
import { Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import { AuthSync } from "./providers/AuthSync";
import { GlobalModal } from "@/components/ui/modal/GlobalModal";
import { ValidateUser } from "./ValidateUser";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "Discover and collect digital art NFTs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${spaceMono.variable} antialiased`}
      >
        <AuthSync />
        <ValidateUser />
        <GlobalModal />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex flex-col justify-end">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
