"use client";

import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { NavLink, ButtonLink } from "../link/Link";
import { LogoLink } from "../link/LogoLink";
import { Button } from "../button/Button";
import UserIcon from "@/public/buttons/user.svg";
import { useAuthStore } from "@/app/store/auth";
import LogoutIcon from "@/public/buttons/logout.svg";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rankings", label: "Rankings" },
  { href: "/connect", label: "Connect a Wallet" },
];

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};
const NavItem = ({ href, children }: NavItemProps) => (
  <li className="tap w-full text-center lg:w-auto">
    <NavLink href={href}>{children}</NavLink>
  </li>
);

type NavListProps = {
  id?: string;
  className?: string;
  vertical?: boolean;
  isUserLoggedIn?: boolean;
};
const NavList = ({
  id,
  className = "",
  vertical = false,
  isUserLoggedIn,
}: NavListProps) => {
  console.log("NavList - isUserLoggedIn:", isUserLoggedIn);

  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push("/sign-in");
  };

  return (
    <nav
      id={id}
      className={`flex ${
        vertical ? "flex-col" : "items-center"
      } gap-8 ${className}`}
    >
      <ul
        className={`flex items-center ${
          vertical ? "flex-col items-start gap-6" : "gap-12"
        }`}
      >
        {navLinks.map(({ href, label }) => (
          <NavItem key={href} href={href}>
            {label}
          </NavItem>
        ))}
        {isUserLoggedIn ? (
          <>
            <NavItem href="/profile">
              <span>Profile</span>
            </NavItem>
            <Button
              className="py-4 px-8 rounded-[20px] bg-accent flex items-center gap-4 font-semibold capitalize tap"
              onClick={handleLogout}
              icon={LogoutIcon}
            >
              <span>Sign out</span>
            </Button>
          </>
        ) : (
          <ButtonLink href="/sign-in" icon={UserIcon} alt="User icon">
            <span>Sign in</span>
          </ButtonLink>
        )}
      </ul>
    </nav>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ANIM_MS = 200;
  const menuId = "primary-nav";
  const isUserLoggedIn = useAuthStore((state) => state.isUserLoggedIn);

  return (
    <header className="w-full sticky top-0 left-0 flex justify-between items-center py-5 px-5 lg:px-12 z-10">
      <div
        className={`absolute w-full bg-background/85 lg:blur-xl inset-0 ease-linear h-screen transition-transform duration-[${ANIM_MS}ms] ${
          isOpen
            ? "translate-y-0"
            : "pointer-events-none delay-150 -translate-y-[85vh] lg:-translate-y-[87.5vh]"
        }`}
      />

      <LogoLink className="z-10" />
      <NavList
        id={menuId}
        className="hidden lg:flex z-10"
        isUserLoggedIn={isUserLoggedIn}
      />

      <div className="flex lg:hidden z-10">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={22}
          duration={ANIM_MS / 1000}
          color="currentColor"
          rounded
          hideOutline
          label="Toggle navigation"
          aria-controls={menuId}
          aria-expanded={isOpen}
        />
      </div>

      {/* Mobile Overlay */}
      <div
        className={[
          "lg:hidden fixed inset-0 flex items-center justify-center",
          "transition-opacity",
          `duration-[${ANIM_MS}ms]`,
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <div className="px-12 py-6 w-max m-auto">
          <NavList isUserLoggedIn={isUserLoggedIn} id={menuId} vertical />
        </div>
      </div>
    </header>
  );
};
