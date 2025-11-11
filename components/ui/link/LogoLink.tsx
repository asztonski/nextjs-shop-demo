import Link from "next/link";
import Image from "next/image";

type LogoLinkProps = {
  className?: string;
  textImageClassName?: string;
};

export const LogoLink = ({ className, textImageClassName }: LogoLinkProps) => {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logos/header-logo.svg"
        alt=""
        aria-hidden
        className="h-8 w-auto"
        width={32}
        height={32}
      />
      <Image
        src="/logos/header-text-logo.svg"
        alt="Next Shop"
        className={`h-5 w-auto hidden md:block ${textImageClassName}`}
        width={72}
        height={20}
      />
    </Link>
  );
};
