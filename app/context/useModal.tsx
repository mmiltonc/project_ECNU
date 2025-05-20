"use client";
import { useState } from "react";

interface ModalType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): ModalType => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("opening");
    setIsOpen(true);
  };
  const closeModal = () => {
    console.log("closing");
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
