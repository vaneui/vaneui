import { createContext, useContext } from 'react';

export interface ModalContextValue {
  closeButton: boolean;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  return useContext(ModalContext);
}
