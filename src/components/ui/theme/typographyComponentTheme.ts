import { SizeTheme } from "./size/sizeTheme";
import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";
import { TypographyComponentProps } from "../props/props";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import React from "react";

const typographyThemeDefaults: Partial<Record<keyof TypographyComponentProps, boolean>> = {
  md: true,
  default: true,
  sans: true,
  normal: true,
};

export const createTypographyComponentTheme = (
  tag: React.ReactNode | string | any,
  base: string = "text-balance",
  textSizeMap: Record<SizeKey, string> = textSizeClasses,
  defaults: Partial<Record<keyof TypographyComponentProps, boolean>> = typographyThemeDefaults,
): SimpleComponentTheme<TypographyComponentProps> => {
  return SimpleComponentTheme.createSimpleComponentTheme<TypographyComponentProps>(
    tag,
    base,
    new SizeTheme(
      undefined, // px
      undefined, // py
      textSizeMap, // text
      undefined  // gap
    ),
    defaults);
};

// Page title specific theme
export const pageTitleTheme: SimpleComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "h1",
  "text-balance tracking-tighter",
  {
    xs: "text-3xl max-lg:text-2xl max-md:text-xl",
    sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
    md: "text-5xl max-lg:text-4xl max-md:text-3xl",
    lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Section title specific theme
export const sectionTitleTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "h2",
  "text-balance",
  {
    xs: "text-2xl max-lg:text-xl  max-md:text-lg",
    sm: "text-3xl max-lg:text-2xl max-md:text-xl",
    md: "text-4xl max-lg:text-3xl max-md:text-2xl",
    lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Title specific theme
export const titleTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "h3",
  "text-balance",
  {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  },
  {...typographyThemeDefaults, semibold: true}
);

// Text specific theme
export const textTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "p",
  "p-0 m-0",
  textSizeClasses,
  {...typographyThemeDefaults, secondary: true}
);

// Link specific theme
export const linkTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "a",
  "hover:underline",
  textSizeClasses,
  {...typographyThemeDefaults, link: true}
);

// List item specific theme
export const listItemTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "li"
);

// List specific theme
export const listTheme: SimpleComponentTheme<TypographyComponentProps>  = createTypographyComponentTheme(
  "ul",
  "list-disc list-inside"
);
