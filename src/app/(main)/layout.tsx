import BottomNavBar from "@/components/BottomNavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative pb-16">
      {children}
      <BottomNavBar />
    </div>
  );
}
