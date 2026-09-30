import type { ModalCloseButtonProps } from "./ModalCloseButtonProps";

/** Modal close-button defaults (renders through theme.button.main; customizable via ThemeProvider modal.closeButton). */
export const modalCloseButtonDefaults: Partial<ModalCloseButtonProps> = {
  sm: true,
  secondary: true,
  // pinned, so app-wide button.main defaults (e.g. filled) can't turn the × invisible
  outline: true,
  transparent: true,
  noShadow: true,
  noInsetRing: true,
};


