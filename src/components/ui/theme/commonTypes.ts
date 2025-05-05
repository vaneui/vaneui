import { Mode } from "../props/mode";

// Common types for all themes
export type ModeledStyles = {
  base: string;
  hover?: string;
  active?: string;
};

export type VariantAppearance = {
  background: ModeledStyles;
  textColor: ModeledStyles;
  borderColor: ModeledStyles;
  ringColor: ModeledStyles;
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