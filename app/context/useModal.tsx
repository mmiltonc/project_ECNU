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
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
