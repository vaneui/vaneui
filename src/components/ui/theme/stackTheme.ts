import {
  StackProps,
  ButtonStyleProps,
  NoBorderProps,
  NoShadowProps,
  NoRingProps,
  NoPaddingProps
} from "../props/props";
import {
  ComponentTheme,
  VariantAppearance,
  createVariantAppearance,
  makeSimpleStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";
import { createStackLayoutTheme } from "./stackLayoutTheme";

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
};

const pxMap: Record<SizeKey, string> = {
  xs: 'px-2',
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
  xl: 'px-6',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-6',
};

export type StackTheme = ComponentTheme<VariantAppearance, StackProps>;

export const defaultStackTheme: StackTheme = {
  base: "flex",

  size: {
    px: makeSizeVariant(pxMap),
    py: makeSizeVariant(pyMap),
    gap: makeSizeVariant(gapMap),
  },

  style: makeSimpleStyleVariants(createVariantAppearance),

  typography: defaultTypographyTheme,

  layout: createStackLayoutTheme(),

  defaults: {
    md: true,
    transparent: true,
    column: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  },
};
