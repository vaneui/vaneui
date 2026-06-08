import type { CheckboxProps } from "./CheckboxProps";

/** Default props for Checkbox wrapper component */
export const checkboxWrapperDefaults: Partial<CheckboxProps> = {
  md: true,
  primary: true,
  inlineGrid: true,
  itemsCenter: true,
  justifyCenter: true,
  filled: true,
  // Pin the (one-line-tall, self-centering) wrapper to the top of the flex
  // cross-axis. Inside a Label with multi-line content, this keeps the checkbox
  // centered on the FIRST text row instead of the middle of all rows, while the
  // Label keeps `itemsCenter` for the single-line Input case.
  selfStart: true,
};
