import type { FieldProps } from "./FieldProps";

/** Default props for Field component. No `control` default: one would force every Field to self-render. */
export const fieldDefaults: Partial<FieldProps> = {
  column: true,
  md: true,
  flex: true,
  itemsStart: true,
  gap: true,
  wFull: true,
  noPadding: true,
  noBorder: true,
  noInsetRing: true,
  outline: true,
  sharp: true,
};
