import Link from "next/link";

export const NavLink = ({
  href,
  children,
  className,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <Link href={href} className={`font-semibold ${className}`}>
      {children}
    </Link>
  );
};

export const ButtonLink = ({
  children,
  href,
  className,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  className?: string;
}>) => {
  return (
    <Link
      href={href}
      className={`py-4 px-8 rounded-[20px] bg-accent flex items-center gap-4 font-semibold capitalize tap ${className}`}
    >
      {children}
    </Link>
  );
};
