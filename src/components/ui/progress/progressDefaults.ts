import type { ProgressProps } from "./ProgressProps";

/** Default props for Progress component (the track; the fill has its own defaults) */
export const progressDefaults: Partial<ProgressProps> = {
  md: true,
  primary: true,
  pill: true,
  transition: true,
  // the track clips the fill, which slides in from outside it
  overflowHidden: true,
  wFull: true,
  noMargin: true,
};
