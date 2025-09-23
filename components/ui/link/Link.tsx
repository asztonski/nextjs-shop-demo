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
