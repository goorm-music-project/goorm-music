import React from "react";
import Modal from "./Modal";
import Link from "next/link";
import { useLoginModalStore } from "../stores/useLoginModalStore";

export default function SuggestLoginModal() {
  const { showLoginModal, setShowLoginModal } = useLoginModalStore();

  return (
    <Modal showModal={showLoginModal} onClose={() => setShowLoginModal(false)}>
      <div className="text-center w-[300px]">
        <h1 className="text-center mt-4">로그인 후 이용해주세요.</h1>
        <Link href={"/login"}>
          <button className="primaryBtn p-2 my-4">로그인하기</button>
        </Link>
      </div>
    </Modal>
  );
}
