export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Strony publiczne nie wymagają żadnych dodatkowych sprawdzeń
  return <>{children}</>;
}
