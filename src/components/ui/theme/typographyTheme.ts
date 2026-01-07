import type { ListProps, TypographyProps } from "../typography";
import { themeDefaults } from "./defaults";
import React from "react";
import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { LinkVariantTheme } from "./appearance/linkVariantTheme";
import { mergeDefaults } from "../../utils/deepMerge";
import { PlTheme } from "./size/plTheme";
import { ListStyleTheme } from "./list/listStyleTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from "../props";
import { textConsumerClass } from "../classes/appearanceClasses";

export interface TypographyTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    text: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
}

export interface LinkTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
  };
  appearance: {
    text: LinkVariantTheme;
  };
  layout: DefaultLayoutThemes;
}

export const createTypographyComponentTheme = (
  tag: React.ElementType,
  base: string = "text-balance",
  fontSizeTheme: FontSizeTheme = new FontSizeTheme(),
  defaults: Partial<TypographyProps> = {},
  lineHeightTheme: LineHeightTheme = new LineHeightTheme(),
  categories: typeof TYPOGRAPHY_CATEGORIES = TYPOGRAPHY_CATEGORIES,
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
        text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      },
      typography: defaultTypographyThemes,
      layout: defaultLayoutsThemes,
    },
    defaults,
    categories,
    (props: TypographyProps) => {
      // Determine tag based on href prop
      return props.href ? "a" : tag;
    });
};

// Page title specific theme - uses responsive font size
export const pageTitleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h1",
  "vane-page-title text-balance tracking-tight w-fit",
  new FontSizeTheme(),
  mergeDefaults(themeDefaults.pageTitle as Record<string, boolean>, {semibold: true}),
  new LineHeightTheme(),
  TYPOGRAPHY_CATEGORIES
);

// Section title specific theme - uses responsive font size
export const sectionTitleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h2",
  "vane-section-title text-balance w-fit",
  new FontSizeTheme(),
  mergeDefaults(themeDefaults.sectionTitle as Record<string, boolean>, {semibold: true}),
  new LineHeightTheme(),
  TYPOGRAPHY_CATEGORIES
);

// Title specific theme - uses responsive font size
export const titleTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "h3",
  "vane-title text-balance w-fit",
  new FontSizeTheme(),
  mergeDefaults(themeDefaults.title as Record<string, boolean>, {semibold: true}),
  new LineHeightTheme(),
  TYPOGRAPHY_CATEGORIES
);

// Text specific theme
export const textTheme: ComponentTheme<TypographyProps, TypographyTheme> = createTypographyComponentTheme(
  "p",
  "vane-text p-0 m-0 w-fit",
  new FontSizeTheme(),
  themeDefaults.text as Partial<TypographyProps>
);

// Link specific theme - uses LinkVariantTheme for link-specific colors
export const linkTheme: ComponentTheme<TypographyProps, LinkTheme> = new ComponentTheme<TypographyProps, LinkTheme>(
  "a",
  "vane-link hover:underline w-fit cursor-pointer",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
    },
    appearance: {
      text: new LinkVariantTheme(),
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
  "vane-list-item",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
    },
    appearance: {
      text: new SimpleConsumerTheme({ base: textConsumerClass, alwaysOutput: true }, 'text'),
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
    text: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes;
  listStyle: ListStyleTheme;
}

// List specific theme
export const listTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "vane-list list-inside",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      paddingLeft: new PlTheme(),
    },
    appearance: {
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
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
