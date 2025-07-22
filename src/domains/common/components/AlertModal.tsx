import React, { useEffect } from "react";
import Modal from "./Modal";
interface Props {
  showModal: boolean;
  onClose: () => void;
  message: string;
}
export default function AlertModal({ showModal, onClose, message }: Props) {
  useEffect(() => {
    if (!showModal) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [showModal, onClose]);

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="text-center">
        <p className="my-8">{message}</p>
      </div>
    </Modal>
  );
}
