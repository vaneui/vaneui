import type { TypographyProps } from "../common";

/** Default props for Text component */
export const textDefaults: Partial<TypographyProps> = {
  md: true,
  wFit: true,
  fontSans: true,
  textLeft: true,
  outline: true,
  inheritAppearance: true,
  // reset the UA <p> margin (was the base-string `m-0`); consumers can opt into
  // margin/marginY/marginT/etc. now that Text carries the margin category
  noMargin: true,
};
