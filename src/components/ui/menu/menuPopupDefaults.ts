import type { PopupProps } from "../popup/PopupProps";

/** Default props for MenuPopup (popup container used inside menus) */
export const menuPopupDefaults: Partial<PopupProps> = {
  md: true,
  fixed: true,
  flex: true,
  column: true,
  noGap: true,
  rounded: true,
  shadow: true,
  border: true,
  noInsetRing: true,
  primary: true,
  outline: true,
  wFit: true,
  constrainWidth: true,
  placeBottomStart: true,
};
