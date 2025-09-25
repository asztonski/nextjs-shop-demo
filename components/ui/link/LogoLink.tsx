import Link from "next/link";
import Image from "next/image";

type LogoLinkProps = {
  fullyVisible?: boolean;
};

export const LogoLink = ({ fullyVisible }: LogoLinkProps) => {
  return (
    <Link href="/" className="flex items-center gap-3 z-10">
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
        className={`h-5 w-auto ${fullyVisible ? "" : "hidden xs:block"}`}
        width={72}
        height={20}
      />
    </Link>
  );
};
