import type { PopupProps } from "../popup/PopupProps";

/** Tooltip popup: smaller and filled in ink (near-white in dark mode), so it reads as an overlay label rather than a panel. */
export const tooltipDefaults: Partial<PopupProps> = {
  sm: true,
  fixed: true,
  flex: true,
  column: true,
  noGap: true,
  rounded: true,
  shadow: true,
  noBorder: true,
  noInsetRing: true,
  primary: true,
  filled: true,
  wFit: true,
  fontSans: true,
  placeTop: true,
};
