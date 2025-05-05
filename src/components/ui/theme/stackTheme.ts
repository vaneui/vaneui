import { StackProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps, NoPaddingProps } from "../props/props";
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

// Stack-specific size maps
const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

const pxMap: Record<SizeKey, string> = {
  xs: 'px-2',
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
  xl: 'px-6',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-6',
};

// Empty maps for unused size properties
const emptyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Stack-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Stack-specific theme type
export type StackTheme = ComponentTheme<VariantAppearance, StackProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps & NoPaddingProps>;


// Default stack theme
export const defaultStackTheme: StackTheme = {
  // Stack-specific base classes
  base: "flex",

  // Use common size variant generator with stack-specific maps
  size: makeSizeVariants(pxMap, pyMap, emptyMap, gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with stack-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Stack-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    column: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
