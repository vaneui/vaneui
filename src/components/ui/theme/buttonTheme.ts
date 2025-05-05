import { SizeKey } from "../props/propKeys";
import { gapMap, pxMap, pyMap, roundedMap, textSizeMap } from "../classes/buttonClasses";
import { ButtonProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants,
  makePxVariants,
  makePyVariants,
  makeTextSizeVariants,
  makeGapVariants,
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";

// Button-specific theme type
export type ButtonTheme = ComponentTheme<VariantAppearance, ButtonProps>;


// Default button theme
export const defaultButtonTheme: ButtonTheme = {
  // Button-specific base classes
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  // Use separate size variant generators with button-specific maps
  px: makePxVariants(pxMap),
  py: makePyVariants(pyMap),
  textSize: makeTextSizeVariants(textSizeMap),
  gap: makeGapVariants(gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with button-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

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
