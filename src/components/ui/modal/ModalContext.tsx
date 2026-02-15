import { createContext, useContext } from 'react';

export interface ModalContextValue {
  onClose: () => void;
  titleId: string;
  bodyId: string;
  setTitleMounted: (mounted: boolean) => void;
  setBodyMounted: (mounted: boolean) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  return useContext(ModalContext);
}
