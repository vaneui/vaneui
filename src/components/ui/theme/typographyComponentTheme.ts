import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants,
  makeTextSizeVariants,
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";

// Typography component-specific theme type
export type TypographyComponentTheme = ComponentTheme<VariantAppearance, TypographyComponentProps & ButtonStyleProps & ShapeProps & NoShadowProps>;

// Create typography component-specific variant appearance
function createTypographyComponentVariantAppearance(
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

// Typography component-specific size maps
const pxMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

const pyMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
};

const gapMap: Record<SizeKey, string> = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

// Typography component-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Default typography component theme
export const defaultTypographyComponentTheme: TypographyComponentTheme = {
  // Typography component-specific base classes
  base: "text-balance",

  // Use only textSize variant generator for typography component
  textSize: makeTextSizeVariants(textSizeMap),

  // Use common style variant generator with typography component-specific factory
  style: makeStyleVariants(createTypographyComponentVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with typography component-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Typography component-specific defaults
  defaults: {
    md: true,
    outline: true,
    default: true,
    sans: true,
    normal: true,
    noShadow: true,
  },
};

// Page title specific theme
export const pageTitleTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "text-balance tracking-tighter",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
    semibold: true,
  },
};

// Section title specific theme
export const sectionTitleTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "text-balance",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
    semibold: true,
  },
};

// Title specific theme
export const titleTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "text-balance",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
    semibold: true,
  },
};

// Text specific theme
export const textTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "p-0 m-0",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
    secondary: true,
  },
};

// Link specific theme
export const linkTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "hover:underline",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
    link: true,
  },
};

// List item specific theme
export const listItemTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
  },
};

// List specific theme
export const listTheme: TypographyComponentTheme = {
  ...defaultTypographyComponentTheme,
  base: "list-disc list-inside",
  defaults: {
    ...defaultTypographyComponentTheme.defaults,
  },
};
