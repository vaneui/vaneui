import { SizeKey } from "../props/propKeys";
import { gapMap, pxMap, pyMap, roundedMap, textSizeMap } from "../classes/buttonClasses";
import { ButtonProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants, 
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";

// Button-specific variant appearance type
export type ButtonVariantAppearance = VariantAppearance;

// Button-specific theme type
export type ButtonTheme = ComponentTheme<ButtonVariantAppearance, ButtonProps>;

// Create button-specific variant appearance
function createButtonVariantAppearance(
  bgBase: string,
  bgHover: string,
  bgActive: string,
  textBase: string,
  borderBase: string,
  ringBase: string
): ButtonVariantAppearance {
  return createVariantAppearance(
    bgBase,
    bgHover,
    bgActive,
    textBase,
    borderBase,
    ringBase
  );
}

// Default button theme
export const defaultButtonTheme: ButtonTheme = {
  // Button-specific base classes
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  // Use common size variant generator with button-specific maps
  size: makeSizeVariants(pxMap, pyMap, textSizeMap, gapMap),

  // Use common style variant generator with button-specific factory
  style: makeStyleVariants(createButtonVariantAppearance),

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
