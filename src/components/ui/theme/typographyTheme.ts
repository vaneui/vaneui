import type { ListProps, TypographyProps } from "../typography";
import { themeDefaults } from "./defaults";
import React from "react";
import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { mergeDefaults } from "../../utils/deepMerge";
import { PlTheme } from "./size/plTheme";
import { ListStyleTheme } from "./list/listStyleTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from "../props";

export interface TypographyTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    text: GenericVariantTheme<AppearanceTheme>;
  };
  layout: DefaultLayoutThemes;
}

export const createTypographyComponentTheme = (
  tag: React.ElementType,
  base: string = "text-balance",
  fontSizeTheme: FontSizeTheme = new FontSizeTheme(),
  defaults: Partial<TypographyProps> = {},
  lineHeightTheme: LineHeightTheme = LineHeightTheme.createDefault(),
): ComponentTheme<TypographyProps, TypographyTheme> => {
  return new ComponentTheme<TypographyProps, TypographyTheme>(
    tag,
    base,
    {
      size: {
        text: fontSizeTheme,
        lineHeight: lineHeightTheme,
      },
      appearance: {
        text: GenericVariantTheme.createTypographyTextTheme(),
      },
      typography: defaultTypographyThemes,
      layout: defaultLayoutsThemes,
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
  FontSizeTheme.createForPageTitle(),
  mergeDefaults(themeDefaults.pageTitle as Record<string, boolean>, {semibold: true}),
  LineHeightTheme.createForPageTitle()
);

// Section title specific theme
export const sectionTitleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h2",
  "text-balance w-fit",
  FontSizeTheme.createForSectionTitle(),
  mergeDefaults(themeDefaults.sectionTitle as Record<string, boolean>, {semibold: true}),
  LineHeightTheme.createForSectionTitle()
);

// Title specific theme
export const titleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h3",
  "text-balance w-fit",
  FontSizeTheme.createForTitle(),
  mergeDefaults(themeDefaults.title as Record<string, boolean>, {semibold: true}),
  LineHeightTheme.createForTitle()
);

// Text specific theme
export const textTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "p",
  "p-0 m-0 w-fit",
  new FontSizeTheme(),
  themeDefaults.text as Partial<TypographyProps>
);

// Link specific theme
export const linkTheme: ComponentTheme<TypographyProps, TypographyTheme> = new ComponentTheme<TypographyProps, TypographyTheme>(
  "a",
  "hover:underline w-fit cursor-pointer",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: LineHeightTheme.createDefault(),
    },
    appearance: {
      text: GenericVariantTheme.createTypographyTextTheme(),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
  },
  themeDefaults.link as Partial<TypographyProps>,
  TYPOGRAPHY_CATEGORIES
);

// ListItem specific theme
export const listItemTheme: ComponentTheme<TypographyProps, TypographyTheme> = new ComponentTheme<TypographyProps, TypographyTheme>(
  "li",
  "",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: LineHeightTheme.createDefault(),
    },
    appearance: {
      text: GenericVariantTheme.createTypographyTextTheme(),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
  },
  themeDefaults.listItem as Partial<TypographyProps>,
  TYPOGRAPHY_CATEGORIES
);

export interface ListTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
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
      text: new FontSizeTheme(),
      lineHeight: LineHeightTheme.createDefault(),
      paddingLeft: new PlTheme(),
    },
    appearance: {
      text: GenericVariantTheme.createTypographyTextTheme(),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
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
