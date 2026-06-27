import type { TypographyProps } from "../common";

/** Default props for Blockquote component */
export const blockquoteDefaults: Partial<TypographyProps> = {
  md: true,
  wFull: true,
  sans: true,
  // logical alignment: start = left in LTR, right in RTL — matches the accent border, which already
  // flips to the inline-start side under dir="rtl". (Physical textLeft would contradict it.)
  textStart: true,
  outline: true,
  inherit: true,
};
