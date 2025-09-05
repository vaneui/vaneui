import { textSizeClasses } from "../classes/typographyClasses";
import { ListProps, TypographyProps } from "../props";
import { themeDefaults } from "./defaults";
import React from "react";
import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { SizeTheme } from "./size/sizeTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
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
    text: GenericVariantTheme<AppearanceTheme>;
  };
  layout: DefaultLayoutThemes;
}


export const createTypographyComponentTheme = (
  tag: React.ReactNode | string | any,
  base: string = "text-balance",
  textSizeMap: Record<SizeKey, string> = textSizeClasses,
  defaults: Partial<TypographyProps> = {},
): ComponentTheme<TypographyProps, TypographyTheme> => {
  return new ComponentTheme<TypographyProps, TypographyTheme>(
    tag,
    base,
    {
      size: {
        text: new SizeTheme(textSizeMap),
      },
      appearance: {
        text: GenericVariantTheme.createUIElementTextTheme(),
      },
      typography: defaultTypographyTheme,
      layout: defaultLayoutTheme,
    },
    defaults,
    TYPOGRAPHY_CATEGORIES,
    (props: TypographyProps) => {
      // Determine tag based on href prop
      return props.href ? "a" : tag;
    });
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
    xl: "text-7xl max-lg:text-6xl max-md:text-5xl"
  },
  mergeDefaults(themeDefaults.pageTitle as Record<string, boolean>, {semibold: true})
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
    xl: "text-6xl max-lg:text-5xl max-md:text-4xl"
  },
  mergeDefaults(themeDefaults.sectionTitle as Record<string, boolean>, {semibold: true})
);

// Title specific theme
export const titleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h3",
  "text-balance w-fit",
  {xs: "text-lg", sm: "text-xl", md: "text-2xl", lg: "text-3xl", xl: "text-4xl"},
  mergeDefaults(themeDefaults.title as Record<string, boolean>, {semibold: true})
);

// Text specific theme
export const textTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "p",
  "p-0 m-0 w-fit",
  textSizeClasses,
  themeDefaults.text as Partial<TypographyProps>
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
      text: GenericVariantTheme.createUIElementTextTheme(),
    },
    typography: defaultTypographyTheme,
    layout: defaultLayoutTheme,
  },
  themeDefaults.link as Partial<TypographyProps>,
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
      text: GenericVariantTheme.createUIElementTextTheme(),
    },
    typography: defaultTypographyTheme,
  },
  themeDefaults.listItem as Partial<TypographyProps>,
  TYPOGRAPHY_CATEGORIES
);

export interface ListTheme extends BaseTypographyComponentTheme {
  size: {
    text: SizeTheme;
    paddingLeft: PlTheme;
  }
  appearance: {
    text: GenericVariantTheme<AppearanceTheme>;
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
      text: GenericVariantTheme.createUIElementTextTheme(),
    },
    typography: defaultTypographyTheme,
    layout: defaultLayoutTheme,
    listStyle: new ListStyleTheme(),
  },
  themeDefaults.list as Partial<ListProps>,
  LIST_CATEGORIES,
  (props: ListProps) => {
    // Determine tag based on list style from props
    const componentProps = props as unknown as Record<string, boolean>;
    
    // Check if decimal is set in props
    const hasDecimal = componentProps?.decimal;
    
    return hasDecimal ? "ol" : "ul";
  }
);
