import type { ProgressFillProps } from "./ProgressFillProps";

/** Default props for the Progress fill: a solid bar the size of the track, slid in by the value */
export const progressFillDefaults: Partial<ProgressFillProps> = {
  primary: true,
  filled: true,
  pill: true,
  transition: true,
  wFull: true,
  hFull: true,
};
