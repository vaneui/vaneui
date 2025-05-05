import { SizeKey } from "../props/propKeys";
import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants, 
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";

// Chip-specific size maps
const pxMap: Record<SizeKey, string> = {
  xs: 'px-2',
  sm: 'px-2.5',
  md: 'px-3.5',
  lg: 'px-5',
  xl: 'px-6',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-1',
  sm: 'py-1.5',
  md: 'py-2',
  lg: 'py-3',
  xl: 'py-4',
};

const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
};

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  xl: 'gap-3',
};

// Chip-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-sm',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

// Chip-specific theme type
export type ChipTheme = ComponentTheme<VariantAppearance, TypographyComponentProps & ButtonStyleProps & ShapeProps & NoShadowProps>;


// Default chip theme
export const defaultChipTheme: ChipTheme = {
  // Chip-specific base classes
  base: "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",

  // Use common size variant generator with chip-specific maps
  size: makeSizeVariants(pxMap, pyMap, textSizeMap, gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with chip-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Chip-specific defaults
  defaults: {
    md: true,
    outline: true,
    secondary: true,
    rounded: true,
    mono: true,
    normal: true,
    noShadow: true,
  },
};
