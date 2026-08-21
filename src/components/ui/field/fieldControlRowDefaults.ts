import type { ColProps } from "../col/ColProps";

/** itemsCenter not itemsStart; restates colDefaults since withDefaults replaces, not merges. */
export const fieldControlRowDefaults: Partial<ColProps> = {
  row: true,
  md: true,
  flex: true,
  itemsCenter: true,
  gap: true,
  noPadding: true,
  noBorder: true,
  noInsetRing: true,
  outline: true,
  sharp: true,
};
