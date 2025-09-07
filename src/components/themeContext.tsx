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
import { defaultGrid2Theme, defaultGrid3Theme, defaultGrid4Theme, GridTheme } from "./ui/theme/gridTheme";
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
  CheckboxProps,
  LabelProps,
  ImgProps,
} from "./ui/props";
import { DeepPartial } from "./utils/deepPartial";
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

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
  grid2: ComponentTheme<GridProps, GridTheme>;
  grid3: ComponentTheme<GridProps, GridTheme>;
  grid4: ComponentTheme<GridProps, GridTheme>;
  pageTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  sectionTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  title: ComponentTheme<TypographyProps, TypographyTheme>;
  text: ComponentTheme<TypographyProps, TypographyTheme>;
  link: ComponentTheme<TypographyProps, TypographyTheme>;
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
  grid2: defaultGrid2Theme,
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

/**
 * Helper type to extract boolean keys from component props.
 * This ensures only valid component prop keys can be used in ThemeDefaults.
 * For example, ButtonProps will only allow keys like 'primary', 'secondary', 'filled', etc.
 */
type BooleanKeys<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: boolean;
};

/**
 * Helper type to get all boolean keys from component props as string-valued keys.
 * This ensures only valid component prop keys can be used in ThemeExtraClasses.
 * The keys are the same as BooleanKeys, but the values are strings (CSS class names).
 */
type StringValueKeys<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: string;
};

export type ThemeDefaults = {
  button?: Partial<BooleanKeys<ButtonProps>>;
  badge?: Partial<BooleanKeys<BadgeProps>>;
  chip?: Partial<BooleanKeys<ChipProps>>;
  code?: Partial<BooleanKeys<CodeProps>>;
  card?: Partial<BooleanKeys<CardProps>>;
  divider?: Partial<BooleanKeys<DividerProps>>;
  container?: Partial<BooleanKeys<ContainerProps>>;
  row?: Partial<BooleanKeys<RowProps>>;
  col?: Partial<BooleanKeys<ColProps>>;
  stack?: Partial<BooleanKeys<StackProps>>;
  section?: Partial<BooleanKeys<SectionProps>>;
  grid2?: Partial<BooleanKeys<GridProps>>;
  grid3?: Partial<BooleanKeys<GridProps>>;
  grid4?: Partial<BooleanKeys<GridProps>>;
  pageTitle?: Partial<BooleanKeys<TypographyProps>>;
  sectionTitle?: Partial<BooleanKeys<TypographyProps>>;
  title?: Partial<BooleanKeys<TypographyProps>>;
  text?: Partial<BooleanKeys<TypographyProps>>;
  link?: Partial<BooleanKeys<TypographyProps>>;
  list?: Partial<BooleanKeys<ListProps>>;
  listItem?: Partial<BooleanKeys<TypographyProps>>;
  checkbox?: {
    input?: Partial<BooleanKeys<CheckboxProps>>;
    check?: Partial<BooleanKeys<CheckboxProps>>;
    wrapper?: Partial<BooleanKeys<CheckboxProps>>;
  };
  label?: Partial<BooleanKeys<LabelProps>>;
  img?: Partial<BooleanKeys<ImgProps>>;
};

// ThemeExtraClasses mirrors the structure of ThemeProps
// For regular components: Record<string, string> for extra classes
// For checkbox: nested structure with input and wrapper
export type ThemeExtraClasses = {
  button?: Partial<StringValueKeys<ButtonProps>>;
  badge?: Partial<StringValueKeys<BadgeProps>>;
  chip?: Partial<StringValueKeys<ChipProps>>;
  code?: Partial<StringValueKeys<CodeProps>>;
  card?: Partial<StringValueKeys<CardProps>>;
  divider?: Partial<StringValueKeys<DividerProps>>;
  container?: Partial<StringValueKeys<ContainerProps>>;
  row?: Partial<StringValueKeys<RowProps>>;
  col?: Partial<StringValueKeys<ColProps>>;
  stack?: Partial<StringValueKeys<StackProps>>;
  section?: Partial<StringValueKeys<SectionProps>>;
  grid2?: Partial<StringValueKeys<GridProps>>;
  grid3?: Partial<StringValueKeys<GridProps>>;
  grid4?: Partial<StringValueKeys<GridProps>>;
  pageTitle?: Partial<StringValueKeys<TypographyProps>>;
  sectionTitle?: Partial<StringValueKeys<TypographyProps>>;
  title?: Partial<StringValueKeys<TypographyProps>>;
  text?: Partial<StringValueKeys<TypographyProps>>;
  link?: Partial<StringValueKeys<TypographyProps>>;
  list?: Partial<StringValueKeys<ListProps>>;
  listItem?: Partial<StringValueKeys<TypographyProps>>;
  checkbox?: {
    input?: Partial<StringValueKeys<CheckboxProps>>;
    check?: Partial<StringValueKeys<CheckboxProps>>;
    wrapper?: Partial<StringValueKeys<CheckboxProps>>;
  };
  label?: Partial<StringValueKeys<LabelProps>>;
  img?: Partial<StringValueKeys<ImgProps>>;
};

/**
 * Recursively applies defaults to theme objects while preserving structure.
 * Navigates both theme and defaults objects in parallel.
 */
function applyDefaultsRecursively(
  themeObject: Record<string, unknown> | object,
  defaultsObject: Record<string, unknown> | object
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
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (defaultsObject as Record<string, unknown>)[key] === 'object' &&
          (defaultsObject as Record<string, unknown>)[key] !== null) {
        applyDefaultsRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (defaultsObject as Record<string, unknown>)[key] as Record<string, unknown>);
      }
    }
  }
}

/**
 * Recursively applies extra classes to theme objects while preserving structure.
 * Navigates both theme and extraClasses objects in parallel.
 */
function applyExtraClassesRecursively(
  themeObject: Record<string, unknown> | object,
  extraClassesObject: Record<string, unknown> | object
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
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (extraClassesObject as Record<string, unknown>)[key] === 'object' &&
          (extraClassesObject as Record<string, unknown>)[key] !== null) {
        applyExtraClassesRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (extraClassesObject as Record<string, unknown>)[key] as Record<string, unknown>);
      }
    }
  }
}

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export type MergeStrategy = 'merge' | 'replace';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeDefaults?: ThemeDefaults;
  extraClasses?: ThemeExtraClasses;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
  mergeStrategy?: MergeStrategy;
}

export function ThemeProvider(
  {
    children,
    theme: themeObject = {},
    themeDefaults,
    extraClasses,
    themeOverride,
    mergeStrategy = 'merge'
  }: ThemeProviderProps) {
  const parentTheme = useContext(ThemeContext);
  
  const mergedTheme = useMemo(() => {
      // Determine the base theme based on merge strategy
      const baseTheme = mergeStrategy === 'replace' 
        ? defaultTheme 
        : parentTheme;
      
      // Always start with a deep clone to ensure isolation
      let finalTheme = themeObject
        ? deepMerge(deepClone(baseTheme), themeObject)
        : deepClone(baseTheme);

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
    [themeObject, themeDefaults, extraClasses, themeOverride, mergeStrategy, parentTheme]
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
