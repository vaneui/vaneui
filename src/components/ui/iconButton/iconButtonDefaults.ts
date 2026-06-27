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
  hFit: true,
};
