import type { TypographyProps } from "../common";

/** Default props for Text component */
export const textDefaults: Partial<TypographyProps> = {
  md: true,
  wFit: true,
  sans: true,
  textLeft: true,
  outline: true,
  inherit: true,
  // reset the UA <p> margin (was the base-string `m-0`); consumers can opt into
  // margin/marginY/marginT/etc. now that Text carries the margin category
  noMargin: true,
};
