import type { TdProps } from "./TdProps";

/** Default props for the Td (data cell) component */
export const tdDefaults: Partial<TdProps> = {
  // no appearance of its own: the cell follows the Table (or a row/section that sets one)
  inheritAppearance: true,
  outline: true,
  borderB: true,
  padding: true,
  textLeft: true,
};
