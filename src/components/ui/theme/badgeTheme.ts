import { SizeKey } from "../props/propKeys";
import { pxMap, pyMap, gapMap, roundedMap, textSizeMap } from "../classes/badgeClasses";
import { 
  ComponentTheme, 
  VariantAppearance, 
  createVariantAppearance,
  makeSizeVariants, 
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme
} from "./componentTheme";

// Badge-specific variant appearance type
export type BadgeVariantAppearance = VariantAppearance;

// Badge-specific theme type
export type BadgeTheme = ComponentTheme<BadgeVariantAppearance>;

// Create badge-specific variant appearance
function createBadgeVariantAppearance(
  bgBase: string,
  bgHover: string,
  bgActive: string,
  textBase: string,
  borderBase: string,
  ringBase: string
): BadgeVariantAppearance {
  return createVariantAppearance(
    bgBase,
    bgHover,
    bgActive,
    textBase,
    borderBase,
    ringBase
  );
}

// Default badge theme
export const defaultBadgeTheme: BadgeTheme = {
  // Badge-specific base classes
  base: "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",

  // Use common size variant generator with badge-specific maps
  size: makeSizeVariants(pxMap, pyMap, textSizeMap, gapMap),

  // Use common style variant generator with badge-specific factory
  style: makeStyleVariants(createBadgeVariantAppearance),

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
