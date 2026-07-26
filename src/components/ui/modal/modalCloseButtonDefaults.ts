import type { ModalCloseButtonProps } from "./ModalCloseButtonProps";

/** Modal close-button defaults (renders through theme.button.main; customizable via ThemeProvider modal.closeButton). */
export const modalCloseButtonDefaults: Partial<ModalCloseButtonProps> = {
  secondary: true,
  transparent: true,
  noShadow: true,
  noRing: true,
};
