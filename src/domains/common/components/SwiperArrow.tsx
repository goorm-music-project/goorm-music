import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function SwiperArrow({ top = "45%" }: { top?: string }) {
  return (
    <>
      <div
        className={`custom-prev absolute ${
          top === "0" ? "top-0" : `top-[${top}]`
        } left-1 z-10 cursor-pointer text-3xl`}
      >
        <MdArrowBackIos />
      </div>
      <div
        className={`custom-next absolute ${
          top === "0" ? "top-0" : `top-[${top}]`
        }  right-0 z-10 cursor-pointer text-3xl`}
      >
        <MdArrowForwardIos />
      </div>
    </>
  );
}
