import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import {
  ComponentTheme,
  VariantAppearance,
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  createDefaultLayoutTheme, makeSizeVariant
} from "./componentTheme";
import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";

export type TypographyComponentTheme = ComponentTheme<VariantAppearance, TypographyComponentProps & ButtonStyleProps & ShapeProps & NoShadowProps>;

const typographyThemeDefaults = {
  md: true,
  outline: true,
  default: true,
  sans: true,
  normal: true,
  noShadow: true,
};

export const createTypographyComponentTheme = (textSizeMap: Record<SizeKey, string> = textSizeClasses): TypographyComponentTheme => ({
  base: "text-balance",
  size: {
    text: makeSizeVariant(textSizeMap)
  },
  style: makeStyleVariants(createVariantAppearance),
  typography: defaultTypographyTheme,
  layout: createDefaultLayoutTheme(),
  defaults: typographyThemeDefaults,
});

// Page title specific theme
export const pageTitleTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme({
    xs: "text-3xl max-lg:text-2xl max-md:text-xl",
    sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
    md: "text-5xl max-lg:text-4xl max-md:text-3xl",
    lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
  }),
  base: "text-balance tracking-tighter",
  defaults: {
    ...typographyThemeDefaults,
    semibold: true,
  },
};

// Section title specific theme
export const sectionTitleTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme({
    xs: "text-2xl max-lg:text-xl max-md:text-lg",
    sm: "text-3xl max-lg:text-2xl max-md:text-xl",
    md: "text-4xl max-lg:text-3xl max-md:text-2xl",
    lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
  }),
  base: "text-balance",
  defaults: {
    ...typographyThemeDefaults,
    semibold: true,
  },
};

// Title specific theme
export const titleTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme({
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }),
  base: "text-balance",
  defaults: {
    ...typographyThemeDefaults,
    semibold: true,
  },
};

// Text specific theme
export const textTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme(),
  base: "p-0 m-0",
  defaults: {
    ...typographyThemeDefaults,
    secondary: true,
  },
};

// Link specific theme
export const linkTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme(),
  base: "hover:underline",
  defaults: {
    ...typographyThemeDefaults,
    link: true,
  },
};

// List item specific theme
export const listItemTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme(),
  base: "",
  defaults: {
    ...typographyThemeDefaults,
  },
};

// List specific theme
export const listTheme: TypographyComponentTheme = {
  ...createTypographyComponentTheme(),
  base: "list-disc list-inside",
  defaults: {
    ...typographyThemeDefaults,
  },
};
