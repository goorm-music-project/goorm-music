import { AiOutlineLike } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function TrackActionBtns() {
  return (
    <div className="flex mt-4">
      <AiOutlineLike size={30} className="ml-5 mr-5" />
      <FaPlay size={30} className="ml-5 mr-5" />
      <HiOutlineDotsVertical size={30} className="ml-5 mr-5" />
    </div>
  );
}
