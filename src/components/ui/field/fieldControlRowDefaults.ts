import type { ColProps } from "../col/ColProps";

/** itemsCenter, not Field's itemsStart: a checkbox aligns with its label's text. */
export const fieldControlRowDefaults: Partial<ColProps> = {
  row: true,
  flex: true,
  itemsCenter: true,
  gap: true,
};
