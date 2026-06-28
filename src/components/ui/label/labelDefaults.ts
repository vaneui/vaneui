import type { LabelProps } from "./LabelProps";

/** Default props for Label component */
export const labelDefaults: Partial<LabelProps> = {
  sm: true,
  flex: true,
  // stacked, left-aligned by default (label above field). For an inline control
  // (e.g. <Checkbox/> + text) use <Label row itemsCenter>.
  column: true,
  itemsStart: true,
  gap: true,
  sans: true,
  medium: true,
  outline: true,
  inherit: true,
  cursorDefault: true,
};
