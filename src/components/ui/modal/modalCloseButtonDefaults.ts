import type { ModalCloseButtonProps } from "./ModalCloseButtonProps";

/**
 * Theme defaults for the modal close button.
 *
 * ModalCloseButton renders through `theme.button.main` but uses
 * these defaults to control its appearance. Customizable via ThemeProvider:
 *
 * ```tsx
 * <ThemeProvider themeDefaults={{ modal: { closeButton: { primary: true } } }}>
 * ```
 */
export const modalCloseButtonDefaults: Partial<ModalCloseButtonProps> = {
  secondary: true,
  transparent: true,
  noShadow: true,
  noRing: true,
};
