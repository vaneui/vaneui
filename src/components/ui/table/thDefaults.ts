import type { ThProps } from "./ThProps";

/** Default props for the Th (header cell) component */
export const thDefaults: Partial<ThProps> = {
  // no appearance of its own: the cell follows the Table (or a row/section that sets one)
  inheritAppearance: true,
  outline: true,
  borderB: true,
  padding: true,
  fontSemibold: true,
  textLeft: true,
};
