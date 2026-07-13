import type { IconButtonProps } from "./IconButtonProps";

/** Default props for IconButton component */
export const iconButtonDefaults: Partial<IconButtonProps> = {
  // sm to match its twin Button's default size — an IconButton beside a Button must not render one
  // size step taller (they share BUTTON_CATEGORIES and the same --py-unit scale).
  sm: true,
  inlineFlex: true,
  itemsCenter: true,
  justifyCenter: true,
  outline: true,
  primary: true,
  rounded: true,
  noBorder: true,
  padding: true,
  ring: true,
  focusVisible: true,
  cursorPointer: true,
  transition: true,
  // wFit (like Button) makes the width definite (fit-content) instead of auto.
  // With auto width, a flex-column parent using the default align-items: stretch
  // would stretch the button to the container width, and once width is definite
  // the aspect-square/hFit pair can no longer recover the square (it renders a
  // full-width bar). A definite fit-content width is immune to that stretch, and
  // because IconButton uses --aspect-ratio:1 (symmetric padding) around a square
  // icon with min-w == min-h, fit-content width equals the height at every size,
  // so the button stays square in any container.
  wFit: true,
  hFit: true,
};
