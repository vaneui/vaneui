import { SizeKey } from "../props/propKeys";
import { pxMap, pyMap, gapMap, roundedMap, textSizeMap } from "../classes/badgeClasses";
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

// Badge-specific theme type
export type BadgeTheme = ComponentTheme<VariantAppearance, TypographyComponentProps & ButtonStyleProps & ShapeProps & NoShadowProps>;


// Default badge theme
export const defaultBadgeTheme: BadgeTheme = {
  // Badge-specific base classes
  base: "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",

  // Use common size variant generator with badge-specific maps
  size: makeSizeVariants(pxMap, pyMap, textSizeMap, gapMap),

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use default layout with badge-specific radius
  layout: createDefaultLayoutTheme(roundedMap),

  // Badge-specific defaults
  defaults: {
    md: true,
    outline: true,
    secondary: true,
    rounded: true,
    sans: true,
    semibold: true,
    uppercase: true,
    noShadow: true,
  },
};
