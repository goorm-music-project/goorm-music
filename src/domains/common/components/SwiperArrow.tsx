import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface Props {
  top?: string;
  classPrev: string;
  classNext: string;
}

export default function SwiperArrow({ top, classPrev, classNext }: Props) {
  return (
    <>
      <div
        className={`${classPrev} absolute ${
          top === "0" ? "top-0" : `top-[45%]`
        } left-1 z-10 cursor-pointer text-3xl`}
      >
        <MdArrowBackIos />
      </div>
      <div
        className={`${classNext} absolute ${
          top === "0" ? "top-0" : `top-[45%]`
        }  right-0 z-10 cursor-pointer text-3xl`}
      >
        <MdArrowForwardIos />
      </div>
    </>
  );
}
