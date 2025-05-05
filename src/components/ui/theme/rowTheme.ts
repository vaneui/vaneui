import { RowProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
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

// Row-specific size maps
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

// Row-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Row-specific theme type
export type RowTheme = ComponentTheme<VariantAppearance, RowProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;

// Create row-specific variant appearance
function createRowVariantAppearance(
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

// Default row theme
export const defaultRowTheme: RowTheme = {
  // Row-specific base classes
  base: "flex flex-row",

  // Use common size variant generator with row-specific maps
  size: makeSizeVariants(emptyMap, emptyMap, emptyMap, gapMap),

  // Use common style variant generator with row-specific factory
  style: makeStyleVariants(createRowVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with row-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Row-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    itemsCenter: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};