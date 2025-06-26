"use client";
import React, { useEffect, useRef } from "react";
import { FaX } from "react-icons/fa6";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ showModal, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialog = dialogRef.current;

  useEffect(() => {
    if (!dialog) return;
    if (showModal && !dialog.open) {
      dialog.showModal();
    } else if (!showModal && dialog.open) {
      dialog.close();
    }
  }, [showModal, onClose, dialog]);

  return (
    <dialog ref={dialogRef} className="relative rounded m-auto">
      <button className="absolute right-3 top-3" onClick={onClose}>
        <FaX />
      </button>
      <div className="p-2">{children}</div>
    </dialog>
  );
}
