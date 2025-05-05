import { BaseComponentProps, ButtonStyleProps, NoRingProps, NoShadowProps, NoBorderProps } from "../props/props";
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

// Divider-specific size maps
const heightMap: Record<SizeKey, string> = {
  xs: 'h-px',
  sm: 'h-0.5',
  md: 'h-1',
  lg: 'h-1.5',
  xl: 'h-2',
};

const widthMap: Record<SizeKey, string> = {
  xs: 'w-full',
  sm: 'w-full',
  md: 'w-full',
  lg: 'w-full',
  xl: 'w-full',
};

// Empty maps for unused size properties
const emptyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Divider-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Divider-specific theme type
export type DividerTheme = ComponentTheme<VariantAppearance, BaseComponentProps & ButtonStyleProps & NoRingProps & NoShadowProps & NoBorderProps>;

// Create divider-specific variant appearance
function createDividerVariantAppearance(
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

// Default divider theme
export const defaultDividerTheme: DividerTheme = {
  // Divider-specific base classes
  base: "bg-gray-200",

  // Use common size variant generator with divider-specific maps
  size: makeSizeVariants(widthMap, heightMap, emptyMap, emptyMap),

  // Use common style variant generator with divider-specific factory
  style: makeStyleVariants(createDividerVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with divider-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Divider-specific defaults
  defaults: {
    xs: true,
    outline: true,
    default: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
