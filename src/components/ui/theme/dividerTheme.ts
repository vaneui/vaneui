import { BaseComponentProps, ButtonStyleProps, NoRingProps, NoShadowProps, NoBorderProps } from "../props/props";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";

//TODO: remove it
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-none',
  sm: 'rounded-none',
  md: 'rounded-none',
  lg: 'rounded-none',
  xl: 'rounded-none',
};

// Divider-specific theme type
export type DividerTheme = ComponentTheme<VariantAppearance, BaseComponentProps & ButtonStyleProps & NoRingProps & NoShadowProps & NoBorderProps>;

// Default divider theme
export const defaultDividerTheme: DividerTheme = {
  // Divider-specific base classes
  base: "bg-gray-200 h-px w-full",

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

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
