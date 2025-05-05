import { ColProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
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

// Col-specific size maps
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

// Col-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Col-specific theme type
export type ColTheme = ComponentTheme<VariantAppearance, ColProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;


// Default col theme
export const defaultColTheme: ColTheme = {
  // Col-specific base classes
  base: "flex flex-col",

  // Use common size variant generator with col-specific maps
  size: makeSizeVariants(emptyMap, emptyMap, emptyMap, gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with col-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Col-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
