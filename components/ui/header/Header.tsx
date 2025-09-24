"use client";

import { useState } from "react";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import { Button } from "../button/Button";
import { NavLink } from "../link/Link";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ANIM_MS = 200;
  const menuId = "primary-nav";

  const navLinks = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/rankings", label: "Rankings" },
    { href: "/connect", label: "Connect a Wallet" },
  ];

  const NavList = ({
    className = "",
    vertical = false,
    onItemClick,
  }: {
    className?: string;
    vertical?: boolean;
    onItemClick?: () => void;
  }) => {
    const NavItem = ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => (
      <li className="tap w-full text-center lg:w-auto" onClick={onItemClick}>
        <NavLink href={href}>{children}</NavLink>
      </li>
    );

    return (
      <nav
        id={menuId}
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
        </ul>

        <Button>
          <img src="/buttons/user.svg" alt="user icon" />
          <span>Sign up</span>
        </Button>
      </nav>
    );
  };

  return (
    <header className="w-full flex justify-between items-center py-5 px-12">
      <Link href="/" className="flex items-center gap-4 z-10" aria-label="Home">
        <img
          src="/logos/header-logo.svg"
          alt=""
          aria-hidden
          className="h-8 w-auto"
        />
        <img
          src="/logos/header-text-logo.svg"
          alt="Next Shop"
          className="h-5 w-auto hidden xs:block"
        />
      </Link>

      <NavList className="hidden lg:flex" />

      <div className="flex z-10 lg:hidden">
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

      <div
        className={[
          "lg:hidden fixed inset-0 flex items-center justify-center bg-background-muted",
          "transition-opacity",
          `duration-[${ANIM_MS}ms]`,
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <div className="px-12 py-6 w-max m-auto">
          <NavList vertical onItemClick={() => setIsOpen(false)} />
        </div>
      </div>
    </header>
  );
};
