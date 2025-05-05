import { LayoutComponentProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
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

// Section-specific size maps
const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-12',
  xl: 'gap-16',
};

const pxMap: Record<SizeKey, string> = {
  xs: 'px-5 max-lg:px-4 max-md:px-3',
  sm: 'px-6 max-lg:px-5 max-md:px-4',
  md: 'px-7 max-lg:px-6 max-md:px-5',
  lg: 'px-8 max-lg:px-7 max-md:px-6',
  xl: 'px-9 max-lg:px-8 max-md:px-7',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-3',
  sm: 'py-5',
  md: 'py-8 max-md:py-5',
  lg: 'py-16 max-lg:py-14 max-md:py-12',
  xl: 'py-20 max-lg:py-16 max-md:py-12',
};

// Empty maps for unused size properties
const emptyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Section-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Section-specific theme type
export type SectionTheme = ComponentTheme<VariantAppearance, LayoutComponentProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;

// Create section-specific variant appearance
function createSectionVariantAppearance(
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

// Default section theme
export const defaultSectionTheme: SectionTheme = {
  // Section-specific base classes
  base: "w-full flex flex-col",

  // Use common size variant generator with section-specific maps
  size: makeSizeVariants(pxMap, pyMap, emptyMap, gapMap),

  // Use common style variant generator with section-specific factory
  style: makeStyleVariants(createSectionVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with section-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Section-specific defaults
  defaults: {
    md: true,
    outline: true,
    default: true,
    itemsStart: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};