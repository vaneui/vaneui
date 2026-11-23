import type { SegmentedControlItemProps } from "./SegmentedControlItemProps";

/** Default props for a segment. Size, appearance, variant and shape also follow the control. */
export const segmentedControlItemDefaults: Partial<SegmentedControlItemProps> = {
  sm: true,
  primary: true,
  outline: true,
  rounded: true,
  inlineFlex: true,
  itemsCenter: true,
  justifyCenter: true,
  relative: true,
  padding: true,
  gap: true,
  fontSans: true,
  fontMedium: true,
  cursorPointer: true,
  transition: true,
  whitespaceNowrap: true,
};
