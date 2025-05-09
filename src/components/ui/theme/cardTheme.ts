import { SizeKey } from "../props/propKeys";
import { CardProps } from "../props/props";
import {
  ComponentTheme,
  VariantAppearance,
  createVariantAppearance,
  makeSimpleStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { createCardLayoutTheme } from "./cardLayoutTheme";

export type CardTheme = ComponentTheme<VariantAppearance, CardProps>;

const pxMap: Record<SizeKey, string> = {
  xs: 'px-3',
  sm: 'px-4',
  md: 'px-5',
  lg: 'px-6',
  xl: 'px-8',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-6',
};

const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

export const defaultCardTheme: CardTheme = {
  base: "flex overflow-hidden",

  size: {
    px: makeSizeVariant(pxMap),
    py: makeSizeVariant(pyMap),
    text: makeSizeVariant(textSizeMap),
    gap: makeSizeVariant(gapMap),
  },

  style: makeSimpleStyleVariants(createVariantAppearance),

  typography: defaultTypographyTheme,

  layout: createCardLayoutTheme(),

  defaults: {
    md: true,
    default: true,
    sans: true,
    normal: true,
    column: true,
  },
};
