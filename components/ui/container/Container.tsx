export const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`container-compact mx-auto py-8 px-3 ${className}`}>
      {children}
    </div>
  );
};
