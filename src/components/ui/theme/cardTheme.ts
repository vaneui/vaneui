import { SizeKey } from "../props/propKeys";
import { CardProps, ButtonStyleProps, ShapeProps, FontFamilyProps, FontWeightProps, NoRingProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants, 
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";
import { commonGaps } from "../classes/spacingClasses";
import { roundedClasses } from "../classes/layoutClasses";

// Card-specific variant appearance type
export type CardVariantAppearance = VariantAppearance;

// Card-specific theme type
export type CardTheme = ComponentTheme<CardVariantAppearance, CardProps & ButtonStyleProps & ShapeProps & FontFamilyProps & FontWeightProps & NoRingProps>;

// Create card-specific variant appearance
function createCardVariantAppearance(
  bgBase: string,
  bgHover: string,
  bgActive: string,
  textBase: string,
  borderBase: string,
  ringBase: string
): CardVariantAppearance {
  return createVariantAppearance(
    bgBase,
    bgHover,
    bgActive,
    textBase,
    borderBase,
    ringBase
  );
}

// Size maps for card
const pxMap: Record<SizeKey, string> = {
  xs: 'px-3',
  sm: 'px-4',
  md: 'px-5',
  lg: 'px-6',
  xl: 'px-8',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-6',
};

const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

// Default card theme
export const defaultCardTheme: CardTheme = {
  // Card-specific base classes
  base: "flex overflow-hidden",

  // Use common size variant generator with card-specific maps
  size: makeSizeVariants(pxMap, pyMap, textSizeMap, gapMap),

  // Use common style variant generator with card-specific factory
  style: makeStyleVariants(createCardVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with card-specific radius
  layout: createDefaultLayoutTheme(roundedClasses),

  // Card-specific defaults
  defaults: {
    md: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    normal: true,
    noRing: true,
  },
};
