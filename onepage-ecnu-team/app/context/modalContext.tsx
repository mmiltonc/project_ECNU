"use client";
// context/ModalContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const abrirModal = () => setIsOpen(true);
  const cerrarModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return context;
};
