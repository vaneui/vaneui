import type { TypographyProps } from "../typography/common";

/** Field's error text, matching the danger cue the control gets from invalid. */
export const fieldErrorDefaults: Partial<TypographyProps> = {
  sm: true,
  danger: true,
  fontSans: true,
  textLeft: true,
  outline: true,
  noMargin: true,
};
