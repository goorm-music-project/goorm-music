import React from "react";
import Modal from "./Modal";
import Link from "next/link";

interface Props {
  showModal: boolean;
  onClose: () => void;
}
export default function SuggestLoginModal({ showModal, onClose }: Props) {
  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="text-center">
        <h1 className="text-center mt-3">로그인 후 이용해주세요.</h1>
        <Link href={"/login"}>
          <button className="primaryBtn p-2 mt-5">로그인하기</button>
        </Link>
      </div>
    </Modal>
  );
}
