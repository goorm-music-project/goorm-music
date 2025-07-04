import React from "react";
import Modal from "./Modal";

interface Props {
  showModal: boolean;
  onClose: () => void;
  confirmFollow: () => void;
  message: string;
  isLoading: boolean;
}
export default function ConfirmModal({
  showModal,
  onClose,
  confirmFollow,
  message,
  isLoading,
}: Props) {
  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="w-xs text-center">
        <h1 className="text-center mt-3">{message}</h1>
        <div className="mt-2">
          <button
            className="primaryBtn px-5 py-1.5 mr-2"
            onClick={() => {
              confirmFollow();
            }}
            disabled={isLoading}
          >
            {isLoading ? "처리 중...." : "예"}
          </button>
          <button
            className="errorBtn px-5 py-1.5"
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
