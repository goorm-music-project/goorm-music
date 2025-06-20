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
      <div className="p-4 fixed left-0 top-16 h-[87vh] overflow-auto">
        {children}
      </div>
      <BottomNavBar />
    </div>
  );
}
