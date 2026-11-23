import type { SegmentedControlProps } from "./SegmentedControlProps";

/** Default props for the SegmentedControl track: a control of Button height at `sm` */
export const segmentedControlDefaults: Partial<SegmentedControlProps> = {
  sm: true,
  primary: true,
  outline: true,
  rounded: true,
  inlineFlex: true,
  itemsStretch: true,
  padding: true,
};
