import Image from "next/image";

export const Button = ({
  children,
  onClick,
  className,
  icon,
}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: string;
}>) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 rounded-[20px] bg-accent flex items-center gap-3 font-semibold capitalize tap ${className}`}
    >
      {icon && <Image src={icon} width={20} height={20} alt={`${icon} icon`} />}
      {children}
    </button>
  );
};
