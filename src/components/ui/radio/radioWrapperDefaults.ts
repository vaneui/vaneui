import type { RadioProps } from "./RadioProps";

/** Default props for Radio wrapper component */
export const radioWrapperDefaults: Partial<RadioProps> = {
  md: true,
  primary: true,
  inlineGrid: true,
  itemsCenter: true,
  justifyCenter: true,
  filled: true,
  // pins the one-line-tall wrapper to the top of the flex line, so the radio stays
  // centered on the FIRST text row inside a multi-line Label
  alignSelfStart: true,
};
