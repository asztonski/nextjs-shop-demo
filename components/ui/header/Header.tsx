"use client";

import Link from "next/link";
import { Button } from "../button/Button";
import { NavLink } from "../link/Link";

export const Header = () => {
  const navLinks = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/rankings", label: "Rankings" },
    { href: "/connect", label: "Connect a Wallet" },
  ];

  const NavList = ({ className }: { className?: string }) => {
    const NavItem = ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => {
      return (
        <li className="tap">
          <NavLink href={href}>{children}</NavLink>
        </li>
      );
    };
    return (
      <nav className={`${className} gap-8`}>
        <ul className={`flex items-center gap-12`}>
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
      <Link href="/" className="flex items-center gap-4" aria-label="Home">
        {/* intrinsic SVG size; remove classes to use the file’s exact size */}
        <img
          src="/logos/header-logo.svg"
          alt=""
          aria-hidden
          className="h-8 w-auto"
        />
        <img
          src="/logos/header-text-logo.svg"
          alt="Next Shop"
          className="h-5 w-auto"
        />
      </Link>
      <NavList className="hidden lg:flex" />
    </header>
  );
};
