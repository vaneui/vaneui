import React, { createContext, useContext, useMemo } from 'react';
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
import { ButtonTheme, defaultButtonTheme } from './ui/theme/buttonTheme';
import { BadgeTheme, defaultBadgeTheme } from './ui/theme/badgeTheme';
import { ChipTheme, defaultChipTheme } from './ui/theme/chipTheme';
import { CodeTheme, defaultCodeTheme } from './ui/theme/codeTheme';
import {
  linkTheme, ListTheme,
  listItemTheme,
  listTheme,
  pageTitleTheme,
  sectionTitleTheme,
  textTheme,
  titleTheme,
  TypographyTheme
} from './ui/theme/typographyTheme';
import { CardTheme, defaultCardTheme } from "./ui/theme/cardTheme";
import { defaultRowTheme, RowTheme } from "./ui/theme/rowTheme";
import { defaultDividerTheme, DividerTheme } from './ui/theme/dividerTheme';
import { ContainerTheme, defaultContainerTheme } from './ui/theme/containerTheme';
import { ColTheme, defaultColTheme } from './ui/theme/colTheme';
import { defaultStackTheme, StackTheme } from './ui/theme/stackTheme';
import { defaultSectionTheme, SectionTheme } from "./ui/theme/sectionTheme";
import { defaultGrid3Theme, defaultGrid4Theme, GridTheme } from "./ui/theme/gridTheme";
import { CheckboxTheme, CheckTheme, CheckboxWrapperTheme, defaultCheckboxTheme, defaultCheckTheme, defaultCheckboxWrapperTheme } from './ui/theme/checkboxTheme';
import { LabelTheme, defaultLabelTheme } from './ui/theme/labelTheme';
import { ImgTheme, defaultImgTheme } from './ui/theme/imgTheme';
import {
  BadgeProps,
  ButtonProps,
  CardProps,
  ChipProps,
  CodeProps,
  ColProps,
  ContainerProps,
  DividerProps,
  GridProps,
  ListProps,
  RowProps,
  SectionProps,
  StackProps,
  TypographyProps,
  LinkProps,
  CheckboxProps,
  LabelProps,
  ImgProps
} from "./ui/props";
import { DeepPartial } from "./utils/deepPartial";
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

export const COMPONENT = ['button', 'badge', 'chip', 'code', 'card', 'divider', 'container', 'row', 'col', 'stack', 'section',
  'grid3', 'grid4', 'pageTitle', 'sectionTitle', 'title', 'text', 'link', 'list', 'listItem', 'checkbox', 'label', 'img'] as const;
export type ComponentKey = typeof COMPONENT[number];

export interface ThemeProps {
  button: ComponentTheme<ButtonProps, ButtonTheme>;
  badge: ComponentTheme<BadgeProps, BadgeTheme>;
  chip: ComponentTheme<ChipProps, ChipTheme>;
  code: ComponentTheme<CodeProps, CodeTheme>;
  card: ComponentTheme<CardProps, CardTheme>;
  divider: ComponentTheme<DividerProps, DividerTheme>;
  container: ComponentTheme<ContainerProps, ContainerTheme>;
  row: ComponentTheme<RowProps, RowTheme>;
  col: ComponentTheme<ColProps, ColTheme>;
  stack: ComponentTheme<StackProps, StackTheme>;
  section: ComponentTheme<SectionProps, SectionTheme>;
  grid3: ComponentTheme<GridProps, GridTheme>;
  grid4: ComponentTheme<GridProps, GridTheme>;
  pageTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  sectionTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  title: ComponentTheme<TypographyProps, TypographyTheme>;
  text: ComponentTheme<TypographyProps, TypographyTheme>;
  link: ComponentTheme<LinkProps, TypographyTheme>;
  listItem: ComponentTheme<TypographyProps, TypographyTheme>;
  list: ComponentTheme<ListProps, ListTheme>;
  checkbox: {
    input: ComponentTheme<CheckboxProps, CheckboxTheme>;
    check: ComponentTheme<CheckboxProps, CheckTheme>;
    wrapper: ComponentTheme<CheckboxProps, CheckboxWrapperTheme>;
  };
  label: ComponentTheme<LabelProps, LabelTheme>;
  img: ComponentTheme<ImgProps, ImgTheme>;
}

export type PartialTheme = DeepPartial<ThemeProps>;

export const defaultTheme: ThemeProps = {
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  chip: defaultChipTheme,
  code: defaultCodeTheme,
  card: defaultCardTheme,
  divider: defaultDividerTheme,
  container: defaultContainerTheme,
  row: defaultRowTheme,
  col: defaultColTheme,
  stack: defaultStackTheme,
  section: defaultSectionTheme,
  grid3: defaultGrid3Theme,
  grid4: defaultGrid4Theme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  checkbox: {
    input: defaultCheckboxTheme,
    check: defaultCheckTheme,
    wrapper: defaultCheckboxWrapperTheme,
  },
  label: defaultLabelTheme,
  img: defaultImgTheme,
};

// ThemeDefaults mirrors the structure of ThemeProps
// For regular components: Record<string, boolean> for defaults
// For checkbox: nested structure with input and wrapper
export type ThemeDefaults = {
  button?: Record<string, boolean>;
  badge?: Record<string, boolean>;
  chip?: Record<string, boolean>;
  code?: Record<string, boolean>;
  card?: Record<string, boolean>;
  divider?: Record<string, boolean>;
  container?: Record<string, boolean>;
  row?: Record<string, boolean>;
  col?: Record<string, boolean>;
  stack?: Record<string, boolean>;
  section?: Record<string, boolean>;
  grid3?: Record<string, boolean>;
  grid4?: Record<string, boolean>;
  pageTitle?: Record<string, boolean>;
  sectionTitle?: Record<string, boolean>;
  title?: Record<string, boolean>;
  text?: Record<string, boolean>;
  link?: Record<string, boolean>;
  list?: Record<string, boolean>;
  listItem?: Record<string, boolean>;
  checkbox?: {
    input?: Record<string, boolean>;
    check?: Record<string, boolean>;
    wrapper?: Record<string, boolean>;
  };
  label?: Record<string, boolean>;
  img?: Record<string, boolean>;
};

// ThemeExtraClasses mirrors the structure of ThemeProps
// For regular components: Record<string, string> for extra classes
// For checkbox: nested structure with input and wrapper
export type ThemeExtraClasses = {
  button?: Record<string, string>;
  badge?: Record<string, string>;
  chip?: Record<string, string>;
  code?: Record<string, string>;
  card?: Record<string, string>;
  divider?: Record<string, string>;
  container?: Record<string, string>;
  row?: Record<string, string>;
  col?: Record<string, string>;
  stack?: Record<string, string>;
  section?: Record<string, string>;
  grid3?: Record<string, string>;
  grid4?: Record<string, string>;
  pageTitle?: Record<string, string>;
  sectionTitle?: Record<string, string>;
  title?: Record<string, string>;
  text?: Record<string, string>;
  link?: Record<string, string>;
  list?: Record<string, string>;
  listItem?: Record<string, string>;
  checkbox?: {
    input?: Record<string, string>;
    check?: Record<string, string>;
    wrapper?: Record<string, string>;
  };
  label?: Record<string, string>;
  img?: Record<string, string>;
};

/**
 * Recursively applies defaults to theme objects while preserving structure.
 * Navigates both theme and defaults objects in parallel.
 */
function applyDefaultsRecursively(
  themeObject: any,
  defaultsObject: any
): void {
  if (!themeObject || typeof themeObject !== 'object' || !defaultsObject || typeof defaultsObject !== 'object') {
    return;
  }

  // If this theme object has a 'defaults' property and defaultsObject looks like defaults
  if ('defaults' in themeObject && 
      typeof themeObject.defaults === 'object' &&
      themeObject.defaults !== null &&
      !('defaults' in defaultsObject)) {
    // defaultsObject is the actual defaults to apply
    themeObject.defaults = mergeDefaults(
      themeObject.defaults as Record<string, boolean>,
      defaultsObject as Record<string, boolean>
    );
  } else {
    // Recursively navigate matching structure
    for (const key in defaultsObject) {
      if (key in themeObject && 
          typeof themeObject[key] === 'object' &&
          themeObject[key] !== null &&
          typeof defaultsObject[key] === 'object' &&
          defaultsObject[key] !== null) {
        applyDefaultsRecursively(themeObject[key], defaultsObject[key]);
      }
    }
  }
}

/**
 * Recursively applies extra classes to theme objects while preserving structure.
 * Navigates both theme and extraClasses objects in parallel.
 */
function applyExtraClassesRecursively(
  themeObject: any,
  extraClassesObject: any
): void {
  if (!themeObject || typeof themeObject !== 'object' || !extraClassesObject || typeof extraClassesObject !== 'object') {
    return;
  }

  // If this theme object has an 'extraClasses' property and extraClassesObject looks like extra classes
  if ('extraClasses' in themeObject && 
      typeof themeObject.extraClasses === 'object' &&
      themeObject.extraClasses !== null &&
      !('extraClasses' in extraClassesObject)) {
    // extraClassesObject is the actual extra classes to apply
    themeObject.extraClasses = {
      ...themeObject.extraClasses,
      ...extraClassesObject as Record<string, string>
    };
  } else {
    // Recursively navigate matching structure
    for (const key in extraClassesObject) {
      if (key in themeObject && 
          typeof themeObject[key] === 'object' &&
          themeObject[key] !== null &&
          typeof extraClassesObject[key] === 'object' &&
          extraClassesObject[key] !== null) {
        applyExtraClassesRecursively(themeObject[key], extraClassesObject[key]);
      }
    }
  }
}

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeDefaults?: ThemeDefaults;
  extraClasses?: ThemeExtraClasses;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
}

export function ThemeProvider(
  {
    children,
    theme: themeObject = {},
    themeDefaults,
    extraClasses,
    themeOverride
  }: ThemeProviderProps) {
  const mergedTheme = useMemo(() => {
      // Always start with a deep clone to ensure isolation
      let finalTheme = themeObject
        ? deepMerge(deepClone(defaultTheme), themeObject)
        : deepClone(defaultTheme);

      if (typeof themeOverride === 'function') {
        const themeToModify = deepClone(finalTheme);
        finalTheme = themeOverride(themeToModify);
      }

      if (themeDefaults !== undefined) {
        // Clone before modifying to ensure isolation
        finalTheme = deepClone(finalTheme);
        // Apply defaults recursively, preserving the structure
        applyDefaultsRecursively(finalTheme, themeDefaults);
      }

      if (extraClasses !== undefined) {
        // Clone before modifying to ensure isolation
        finalTheme = deepClone(finalTheme);
        // Apply extra classes recursively, preserving the structure
        applyExtraClassesRecursively(finalTheme, extraClasses);
      }

      return finalTheme;
    },
    [themeObject, themeDefaults, extraClasses, themeOverride]
  );

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeProps {
  return useContext(ThemeContext);
}
