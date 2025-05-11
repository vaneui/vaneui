
import { SimpleComponentThemeClass } from "./componentThemeClass";
import { defaultTypographyTheme } from "./typographyThemeClass";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme, VariantAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";

export type TypographyComponentTheme = SimpleComponentThemeClass;

const typographyThemeDefaults = {
  md: true,
  outline: true,
  default: true,
  sans: true,
  normal: true,
  noShadow: true,
};

export const createTypographyComponentTheme = (textSizeMap: Record<SizeKey, string> = textSizeClasses): TypographyComponentTheme => {
  // Create size theme with text size variants
  const sizeTheme = new SizeTheme(
    undefined, // px
    undefined, // py
    SizeTheme.makeSizeVariant(textSizeMap), // text
    undefined  // gap
  );

  // Create appearance theme
  const styleTheme = SimpleAppearanceTheme.makeSimpleStyleVariants(
    (bgBase, bgHover, bgActive, textBase, borderBase, ringBase) => 
      new VariantAppearanceTheme(
        { base: bgBase, hover: bgHover, active: bgActive },
        { base: textBase, hover: '', active: '' },
        { base: borderBase, hover: '', active: '' },
        { base: ringBase, hover: '', active: '' }
      )
  );

  return new SimpleComponentThemeClass(
    "text-balance", // base
    sizeTheme,
    new SimpleAppearanceTheme(styleTheme),
    defaultTypographyTheme,
    BaseLayoutThemeClass.createBaseLayoutTheme(),
    typographyThemeDefaults
  );
};

// Page title specific theme
export const pageTitleTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme({
    xs: "text-3xl max-lg:text-2xl max-md:text-xl",
    sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
    md: "text-5xl max-lg:text-4xl max-md:text-3xl",
    lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
  });

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "text-balance tracking-tighter",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults, semibold: true }
  );
})();

// Section title specific theme
export const sectionTitleTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme({
    xs: "text-2xl max-lg:text-xl max-md:text-lg",
    sm: "text-3xl max-lg:text-2xl max-md:text-xl",
    md: "text-4xl max-lg:text-3xl max-md:text-2xl",
    lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
  });

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "text-balance",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults, semibold: true }
  );
})();

// Title specific theme
export const titleTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme({
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  });

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "text-balance",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults, semibold: true }
  );
})();

// Text specific theme
export const textTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme();

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "p-0 m-0",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults, secondary: true }
  );
})();

// Link specific theme
export const linkTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme();

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "hover:underline",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults, link: true }
  );
})();

// List item specific theme
export const listItemTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme();

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults }
  );
})();

// List specific theme
export const listTheme: TypographyComponentTheme = (() => {
  const theme = createTypographyComponentTheme();

  // Create a new instance with modified properties
  return new SimpleComponentThemeClass(
    "list-disc list-inside",
    theme.size,
    theme.style,
    theme.typography,
    theme.layout,
    { ...typographyThemeDefaults }
  );
})();
