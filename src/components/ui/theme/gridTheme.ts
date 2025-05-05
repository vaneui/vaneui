import { GridProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants, 
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";

// Grid-specific size maps
const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

// Empty maps for unused size properties
const emptyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Grid-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Grid-specific theme type
export type GridTheme = ComponentTheme<VariantAppearance, GridProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;

// Create grid-specific variant appearance
function createGridVariantAppearance(
  bgBase: string,
  bgHover: string,
  bgActive: string,
  textBase: string,
  borderBase: string,
  ringBase: string
): VariantAppearance {
  return createVariantAppearance(
    bgBase,
    bgHover,
    bgActive,
    textBase,
    borderBase,
    ringBase
  );
}

// Default grid theme
export const defaultGridTheme: GridTheme = {
  // Grid-specific base classes
  base: "grid",

  // Use common size variant generator with grid-specific maps
  size: makeSizeVariants(emptyMap, emptyMap, emptyMap, gapMap),

  // Use common style variant generator with grid-specific factory
  style: makeStyleVariants(createGridVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with grid-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Grid-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};

// Grid3 specific theme
export const grid3Theme: GridTheme = {
  ...defaultGridTheme,
  base: "grid grid-cols-1 md:grid-cols-3",
};

// Grid4 specific theme
export const grid4Theme: GridTheme = {
  ...defaultGridTheme,
  base: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};