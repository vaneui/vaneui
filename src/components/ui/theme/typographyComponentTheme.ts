import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";
import { TypographyComponentProps } from "../props/props";
import React from "react";
import { TypographyTheme } from "./typography/typographyTheme";
import { TextTheme } from "./size/textTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";

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
): ComponentTheme<TypographyComponentProps> => {
  return new ComponentTheme<TypographyComponentProps>(
    tag,
    base,
    {
      size: {
        text: new TextTheme(textSizeMap),
      },
      typography: TypographyTheme.createDefaultTypographyTheme(),
      appearance: SimpleAppearanceTheme.createDefaultStyle(),
    },
    defaults);
};

// Page title specific theme
export const pageTitleTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
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
export const sectionTitleTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
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
export const titleTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
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
export const textTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "p",
  "p-0 m-0",
  textSizeClasses,
  {...typographyThemeDefaults, secondary: true}
);

// Link specific theme
export const linkTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "a",
  "hover:underline",
  textSizeClasses,
  {...typographyThemeDefaults, link: true}
);

// List item specific theme
export const listItemTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "li"
);

// List specific theme
export const listTheme: ComponentTheme<TypographyComponentProps> = createTypographyComponentTheme(
  "ul",
  "list-disc list-inside"
);
