import { Mode } from "../props/mode";

export type VariantAppearance = {
  background: Record<Mode, string>;
  textColor: Record<Mode, string>;
  borderColor: Record<Mode, string>;
  ringColor: Record<Mode, string>;
};

// Helper function to create a standard variant appearance
export function createVariantAppearance(
  bgBase: string,
  bgHover: string,
  bgActive: string,
  textBase: string,
  borderBase: string,
  ringBase: string
): VariantAppearance {
  return {
    background: {
      base: bgBase,
      hover: bgHover,
      active: bgActive,
    },
    textColor: {
      base: textBase,
      hover: '',
      active: '',
    },
    borderColor: {
      base: borderBase,
      hover: '',
      active: '',
    },
    ringColor: {
      base: ringBase,
      hover: '',
      active: '',
    }
  };
}