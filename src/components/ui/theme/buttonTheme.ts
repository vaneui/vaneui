import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { ButtonProps } from "../props/props";
import { 
  StyleVariantComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { createButtonLayoutTheme } from "./buttonLayoutTheme";

// Button-specific theme type
export type ButtonTheme = StyleVariantComponentTheme<VariantAppearance, ButtonProps>;

// Default button theme
export const defaultButtonTheme: ButtonTheme = {
  // Button-specific base classes
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  size: {
    px: makeSizeVariant(pxMap),
    py: makeSizeVariant(pyMap),
    text: makeSizeVariant(textSizeMap),
    gap: makeSizeVariant(gapMap),
  },

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use button-specific layout theme
  layout: createButtonLayoutTheme(),

  // Button-specific defaults
  defaults: {
    md: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    semibold: true,
    textCenter: true,
    noBorder: true,
  },
};
