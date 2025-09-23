export const Button = ({
  children,
  onClick,
  className,
}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}>) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-8 rounded-[20px] bg-accent flex items-center gap-4 font-semibold capitalize tap ${className}`}
    >
      {children}
    </button>
  );
};
