import { FaSearch } from "react-icons/fa";

export default function MobileTopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#6CC2FF] text-white h-16 flex justify-between items-center z-50">
      <img src="/goorm_logo_white.png" alt="로고" className="w-14 ml-3" />
      <FaSearch size={20} className="mr-3" />
    </div>
  );
}
