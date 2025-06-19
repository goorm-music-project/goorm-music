import BottomNavBar from "@/components/BottomNavBar";
import MobileTopBar from "@/components/MobileTopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative pb-16">
      <MobileTopBar />
      {children}
      <BottomNavBar />
    </div>
  );
}
