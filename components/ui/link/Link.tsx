import Link from "next/link";
import Image from "next/image";

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
    <Link href={href} className={`${className}`}>
      {children}
    </Link>
  );
};

export const ButtonLink = ({
  children,
  href,
  className,
  icon,
  alt,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  className?: string;
  icon?: string;
  alt?: string;
}>) => {
  return (
    <Link
      href={href}
      className={`py-4 px-8 rounded-[20px] bg-accent flex items-center gap-4 font-semibold capitalize tap ${className}`}
    >
      {icon && (
        <Image src={icon} alt={alt ?? "link icon"} width={19} height={19} />
      )}
      {children}
    </Link>
  );
};
