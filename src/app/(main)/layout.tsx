import BottomNavBar from "@/domains/layout/components/BottomNavBar";
import MobileTopBar from "@/domains/layout/components/MobileTopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative pb-16">
      <MobileTopBar />
      <div className="w-full p-4 fixed left-0 top-16 h-[86vh] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <BottomNavBar />
    </div>
  );
}
