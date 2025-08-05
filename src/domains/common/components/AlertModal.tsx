import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAlertModalStore } from "../stores/useAlertModalStore";

export default function AlertModal() {
  const { message, showAlertModal, setShowAlertModal } = useAlertModalStore();
  useEffect(() => {
    if (!showAlertModal) return;
    const timer = setTimeout(() => {
      setShowAlertModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlertModal, setShowAlertModal]);

  return (
    <Modal showModal={showAlertModal} onClose={() => setShowAlertModal(false)}>
      <div className="text-center">
        <p className="my-8">{message}</p>
      </div>
    </Modal>
  );
}
