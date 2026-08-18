import type { LabelProps } from "../label/LabelProps";

/** Field's label sits above the control and owns no layout of its own. */
export const fieldLabelDefaults: Partial<LabelProps> = {
  sm: true,
  block: true,
  wFit: true,
  noGap: true,
  fontSans: true,
  fontMedium: true,
  outline: true,
  inheritAppearance: true,
  cursorPointer: true,
};
