import type { SwitchProps } from "./SwitchProps";

/** Default props for Switch wrapper component */
export const switchWrapperDefaults: Partial<SwitchProps> = {
  md: true,
  primary: true,
  inlineGrid: true,
  itemsCenter: true,
  justifyCenter: true,
  filled: true,
  // Pin the one-line-tall wrapper to the top of the flex cross-axis so the track
  // stays centered on the FIRST text row inside a multi-line Label.
  alignSelfStart: true,
};
