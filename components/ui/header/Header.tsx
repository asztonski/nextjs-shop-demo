"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import { Button } from "../button/Button";
import { NavLink } from "../link/Link";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rankings", label: "Rankings" },
  { href: "/connect", label: "Connect a Wallet" },
];

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};
const NavItem = ({ href, children, onClick }: NavItemProps) => (
  <li className="tap w-full text-center lg:w-auto" onClick={onClick}>
    <NavLink href={href}>{children}</NavLink>
  </li>
);

type NavListProps = {
  id?: string;
  className?: string;
  vertical?: boolean;
  onItemClick?: () => void;
};
const NavList = ({
  id,
  className = "",
  vertical = false,
  onItemClick,
}: NavListProps) => {
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
          <NavItem key={href} href={href} onClick={onItemClick}>
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

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ANIM_MS = 200;
  const menuId = "primary-nav";

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback((next: boolean) => setIsOpen(next), []);

  return (
    <header
      className={`w-full fixed top-0 left-0 flex justify-between items-center py-5 px-12`}
    >
      <div
        className={`absolute w-full bg-background/85 lg:blur-xl inset-0 ease-linear h-screen transition-transform duration-[${ANIM_MS}ms] ${
          isOpen
            ? "translate-y-0"
            : "pointer-events-none delay-150 -translate-y-[85vh] lg:-translate-y-[87.5vh]"
        }`}
      />
      {/* Logo */}
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

      {/* Desktop Navigation */}
      <NavList id={menuId} className="hidden lg:flex z-10" />

      {/* Mobile Navigation */}
      <div className="flex z-10 lg:hidden">
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
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
          <NavList id={menuId} vertical onItemClick={closeMenu} />
        </div>
      </div>
    </header>
  );
};
