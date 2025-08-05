import { textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { ListProps, TypographyProps } from "../props/props";
import React from "react";
import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { SizeTheme } from "./size/sizeTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { mergeDefaults } from "../../utils/deepMerge";
import { SizeKey } from "../props";
import { PlTheme } from "./size/plTheme";
import { ListStyleTheme } from "./list/listStyleTheme";
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from "../props";

export interface TypographyTheme extends BaseTypographyComponentTheme {
  size: {
    text: SizeTheme;
  };
  appearance: {
    text: AppearanceTheme;
  };
  layout: DefaultLayoutThemes;
}

const typographyThemeDefaults: Partial<TypographyProps> = {
  md: true,
  default: true,
  sans: true,
  normal: true,
};

export const createTypographyComponentTheme = (
  tag: React.ReactNode | string | any,
  base: string = "text-balance",
  textSizeMap: Record<SizeKey, string> = textSizeClasses,
  defaults: Partial<TypographyProps> = typographyThemeDefaults,
): ComponentTheme<TypographyProps, TypographyTheme> => {
  return new ComponentTheme<TypographyProps, TypographyTheme>(
    tag,
    base,
    {
      size: {
        text: new SizeTheme(textSizeMap),
      },
      appearance: {
        text: AppearanceTheme.createTheme({base: textAppearanceClasses}, {
          transparentClassSource: textAppearanceClasses,
          linkClassSource: textAppearanceClasses
        }),
      },
      typography: defaultTypographyTheme,
      layout: defaultLayoutTheme,
    },
    defaults,
    TYPOGRAPHY_CATEGORIES);
};

// Page title specific theme
export const pageTitleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
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
export const sectionTitleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
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
export const titleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
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
export const textTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "p",
  "p-0 m-0 w-fit",
  textSizeClasses
);

// Link specific theme
export const linkTheme: ComponentTheme<TypographyProps, TypographyTheme> = new ComponentTheme<TypographyProps, TypographyTheme>(
  "a",
  "hover:underline w-fit cursor-pointer",
  {
    size: {
      text: new SizeTheme(textSizeClasses, false),
    },
    appearance: {
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}, {
        transparentClassSource: textAppearanceClasses,
        linkClassSource: textAppearanceClasses
      }),
    },
    typography: defaultTypographyTheme,
    layout: defaultLayoutTheme,
  },
  {
    link: true,
    default: true,
    sans: true,
    normal: true,
  },
  TYPOGRAPHY_CATEGORIES
);

// List specific theme
export const listItemTheme: ComponentTheme<TypographyProps, TypographyTheme> = new ComponentTheme<TypographyProps, TypographyTheme>(
  "li",
  "",
  {
    size: {
      text: new SizeTheme(textSizeClasses, false),
    },
    appearance: {
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
    },
    typography: defaultTypographyTheme,
  },
  {},//keep empty to apply parent style
  TYPOGRAPHY_CATEGORIES
);

export interface ListTheme extends BaseTypographyComponentTheme {
  size: {
    text: SizeTheme;
    paddingLeft: PlTheme;
  }
  appearance: {
    text: AppearanceTheme;
  };
  layout: DefaultLayoutThemes;
  listStyle: ListStyleTheme;
}

// List specific theme
export const listTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "list-inside",
  {
    size: {
      text: new SizeTheme(textSizeClasses),
      paddingLeft: new PlTheme(),
    },
    appearance: {
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
    },
    typography: defaultTypographyTheme,
    layout: defaultLayoutTheme,
    listStyle: new ListStyleTheme(),
  },
  {
    md: true,
    default: true,
    sans: true,
    normal: true,
    padding: true,
    disc: true,
  },
  LIST_CATEGORIES,
  (props: ListProps, defaults: Partial<ListProps>) => {
    // Determine tag based on list style from props and defaults
    const componentProps = props as unknown as Record<string, boolean>;
    const defaultsRecord = defaults as Record<string, boolean>;
    
    // Check if decimal is set in props or defaults
    const hasDecimal = componentProps?.decimal || defaultsRecord?.decimal;
    
    return hasDecimal ? "ol" : "ul";
  }
);
