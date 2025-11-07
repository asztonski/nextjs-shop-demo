import Image from "next/image";

export const Button = ({
  children,
  onClick,
  className,
  icon,
  type,
  isDisabled,
}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
}>) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 rounded-[20px] w-max bg-accent flex items-center justify-center gap-3 font-semibold capitalize ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "tap"
      } ${className}`}
      disabled={isDisabled}
      type={type}
    >
      {icon && <Image src={icon} width={20} height={20} alt={`${icon} icon`} />}
      {children}
    </button>
  );
};
