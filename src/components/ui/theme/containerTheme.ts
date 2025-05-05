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

// Container-specific size maps
const widthMap: Record<SizeKey, string> = {
  xs: 'max-w-3xl',
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
};

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2 max-lg:gap-1',
  sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
  md: 'gap-6 max-lg:gap-5 max-md:gap-4',
  lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
  xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
};

// Empty maps for unused size properties
const emptyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Container-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Container-specific theme type
export type ContainerTheme = ComponentTheme<VariantAppearance, LayoutComponentProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;


// Default container theme
export const defaultContainerTheme: ContainerTheme = {
  // Container-specific base classes
  base: "flex flex-col mx-auto w-full",

  // Use common size variant generator with container-specific maps
  size: makeSizeVariants(widthMap, emptyMap, emptyMap, gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with container-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Container-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    itemsStart: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
