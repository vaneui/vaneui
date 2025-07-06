import { SizeKey } from "../props/keys";
import { textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { TypographyComponentProps } from "../props/props";
import React from "react";
import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { SizeTheme } from "./size/sizeTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { mergeDefaults } from "../../utils/deepMerge";

export interface TypographyComponentTheme<P> extends BaseComponentTheme<P> {
  size: {
    text: SizeTheme;
  };
  appearance: {
    text: TextAppearanceTheme;
  };
}

const typographyThemeDefaults: Partial<TypographyComponentProps> = {
  md: true,
  default: true,
  sans: true,
  normal: true,
};

export const createTypographyComponentTheme = (
  tag: React.ReactNode | string | any,
  base: string = "text-balance",
  textSizeMap: Record<SizeKey, string> = textSizeClasses,
  defaults: Partial<TypographyComponentProps> = typographyThemeDefaults,
): ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> => {
  return new ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>(
    tag,
    base,
    {
      size: {
        text: new SizeTheme(textSizeMap),
      },
      appearance: {
        text: TextAppearanceTheme.createTheme({base: textAppearanceClasses}),
      }
    },
    defaults);
};

// Page title specific theme
export const pageTitleTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "h1",
  "text-balance tracking-tight w-fit",
  {
    xs: "text-3xl max-lg:text-2xl max-md:text-xl",
    sm: "text-4xl max-lg:text-3xl max-md:text-2xl",
    md: "text-5xl max-lg:text-4xl max-md:text-3xl",
    lg: "text-6xl max-lg:text-5xl max-md:text-4xl",
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl",
  },
  mergeDefaults(typographyThemeDefaults as Record<string, boolean>, {semibold: true})
);

// Section title specific theme
export const sectionTitleTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "h2",
  "text-balance w-fit",
  {
    xs: "text-2xl max-lg:text-xl  max-md:text-lg",
    sm: "text-3xl max-lg:text-2xl max-md:text-xl",
    md: "text-4xl max-lg:text-3xl max-md:text-2xl",
    lg: "text-5xl max-lg:text-4xl max-md:text-3xl",
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl",
  },
  mergeDefaults(typographyThemeDefaults as Record<string, boolean>, {semibold: true})
);

// Title specific theme
export const titleTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "h3",
  "text-balance w-fit",
  {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  },
  mergeDefaults(typographyThemeDefaults as Record<string, boolean>, {semibold: true})
);

// Text specific theme
export const textTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "p",
  "p-0 m-0 w-fit",
  textSizeClasses,
  mergeDefaults(typographyThemeDefaults as Record<string, boolean>, {secondary: true})
);

// Link specific theme
export const linkTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "a",
  "hover:underline w-fit",
  textSizeClasses,
  mergeDefaults(typographyThemeDefaults as Record<string, boolean>, {link: true})
);

// List item specific theme
export const listItemTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "li"
);

// List specific theme
export const listTheme: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>> = createTypographyComponentTheme(
  "ul",
  "list-disc list-inside"
);
