import { RowProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import {
  ComponentTheme,
  VariantAppearance,
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";
import { createRowLayoutTheme } from "./rowLayoutTheme";

// Row-specific size maps
const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

// Row-specific rounded classes are now defined in rowLayoutTheme.ts

// Row-specific theme type
export type RowTheme = ComponentTheme<VariantAppearance, RowProps & ButtonStyleProps & NoBorderProps & NoShadowProps & NoRingProps>;


// Default row theme
export const defaultRowTheme: RowTheme = {
  // Row-specific base classes
  base: "flex flex-row",

  // Use only gap variant generator for row
  size: {
    gap: makeSizeVariant(gapMap)
  },

  // Use common style variant generator
  style: makeStyleVariants(createVariantAppearance),

  // Use default typography settings
  typography: defaultTypographyTheme,

  // Use row-specific layout theme
  layout: createRowLayoutTheme(),

  // Row-specific defaults
  defaults: {
    md: true,
    outline: true,
    transparent: true,
    itemsCenter: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
