import React, { createContext, useContext, useMemo } from 'react';
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
import type { ButtonTheme } from './ui/button/ButtonTheme';
import { defaultButtonTheme } from './ui/button/defaultButtonTheme';
import type { BadgeTheme } from './ui/badge/BadgeTheme';
import { defaultBadgeTheme } from './ui/badge/defaultBadgeTheme';
import type { ChipTheme } from './ui/chip/ChipTheme';
import { defaultChipTheme } from './ui/chip/defaultChipTheme';
import type { CodeTheme } from './ui/code/CodeTheme';
import { defaultCodeTheme } from './ui/code/defaultCodeTheme';
import { textTheme } from './ui/typography/text/defaultTextTheme';
import { titleTheme } from './ui/typography/title/defaultTitleTheme';
import { sectionTitleTheme } from './ui/typography/sectionTitle/defaultSectionTitleTheme';
import { pageTitleTheme } from './ui/typography/pageTitle/defaultPageTitleTheme';
import { linkTheme } from './ui/typography/link/defaultLinkTheme';
import { listTheme } from './ui/typography/list/defaultListTheme';
import { listItemTheme } from './ui/typography/listItem/defaultListItemTheme';
import type { TypographyTheme } from './ui/typography/common/TypographyTheme';
import type { LinkTheme } from './ui/typography/link/LinkTheme';
import type { ListTheme } from './ui/typography/list/ListTheme';
import type { ListItemTheme } from './ui/typography/listItem/ListItemTheme';
import type { CardTheme } from "./ui/card/CardTheme";
import { defaultCardTheme } from "./ui/card/defaultCardTheme";
import type { RowTheme } from "./ui/row/RowTheme";
import { defaultRowTheme } from "./ui/row/defaultRowTheme";
import type { DividerTheme } from './ui/divider/DividerTheme';
import { defaultDividerTheme } from './ui/divider/defaultDividerTheme';
import type { ContainerTheme } from './ui/container/ContainerTheme';
import { defaultContainerTheme } from './ui/container/defaultContainerTheme';
import type { ColTheme } from './ui/col/ColTheme';
import { defaultColTheme } from './ui/col/defaultColTheme';
import type { StackTheme } from './ui/stack/StackTheme';
import { defaultStackTheme } from './ui/stack/defaultStackTheme';
import type { SectionTheme } from "./ui/section/SectionTheme";
import { defaultSectionTheme } from "./ui/section/defaultSectionTheme";
import type { GridTheme } from "./ui/grid/GridTheme";
import { defaultGrid2Theme } from "./ui/grid/defaultGrid2Theme";
import { defaultGrid3Theme } from "./ui/grid/defaultGrid3Theme";
import { defaultGrid4Theme } from "./ui/grid/defaultGrid4Theme";
import { defaultGrid5Theme } from "./ui/grid/defaultGrid5Theme";
import { defaultGrid6Theme } from "./ui/grid/defaultGrid6Theme";
import type { CheckboxTheme } from './ui/checkbox/CheckboxTheme';
import type { CheckboxCheckTheme } from './ui/checkbox/CheckboxCheckTheme';
import type { CheckboxIndeterminateTheme } from './ui/checkbox/CheckboxIndeterminateTheme';
import type { CheckboxWrapperTheme } from './ui/checkbox/CheckboxWrapperTheme';
import { defaultCheckboxTheme } from './ui/checkbox/defaultCheckboxTheme';
import { defaultCheckboxCheckTheme } from './ui/checkbox/defaultCheckboxCheckTheme';
import { defaultCheckboxIndeterminateTheme } from './ui/checkbox/defaultCheckboxIndeterminateTheme';
import { defaultCheckboxWrapperTheme } from './ui/checkbox/defaultCheckboxWrapperTheme';
import type { LabelTheme } from './ui/label/LabelTheme';
import { defaultLabelTheme } from './ui/label/defaultLabelTheme';
import type { ImgTheme } from './ui/img/ImgTheme';
import { defaultImgTheme } from './ui/img/defaultImgTheme';
import type { InputTheme } from './ui/input/InputTheme';
import { defaultInputTheme } from './ui/input/defaultInputTheme';
import type { OverlayTheme } from './ui/overlay/OverlayTheme';
import { defaultOverlayTheme } from './ui/overlay/defaultOverlayTheme';
import type { ModalContentTheme } from './ui/modal/ModalContentTheme';
import type { ModalHeaderTheme } from './ui/modal/ModalHeaderTheme';
import type { ModalBodyTheme } from './ui/modal/ModalBodyTheme';
import type { ModalFooterTheme } from './ui/modal/ModalFooterTheme';
import { defaultModalContentTheme } from './ui/modal/defaultModalContentTheme';
import { defaultModalOverlayTheme } from './ui/modal/defaultModalOverlayTheme';
import { defaultModalHeaderTheme } from './ui/modal/defaultModalHeaderTheme';
import { defaultModalBodyTheme } from './ui/modal/defaultModalBodyTheme';
import { defaultModalFooterTheme } from './ui/modal/defaultModalFooterTheme';
import type { PopupTheme } from './ui/popup/PopupTheme';
import { defaultPopupTheme } from './ui/popup/defaultPopupTheme';
import type { BadgeProps } from "./ui/badge/BadgeProps";
import type { ButtonProps } from "./ui/button/ButtonProps";
import type { CardProps } from "./ui/card/CardProps";
import type { ChipProps } from "./ui/chip/ChipProps";
import type { CodeProps } from "./ui/code/CodeProps";
import type { ColProps } from "./ui/col";
import type { ContainerProps } from "./ui/container";
import type { DividerProps } from "./ui/divider";
import type { GridProps } from "./ui/grid";
import type { ListProps, TypographyProps } from "./ui/typography";
import type { RowProps } from "./ui/row/RowProps";
import type { SectionProps } from "./ui/section";
import type { StackProps } from "./ui/stack";
import type { CheckboxProps } from "./ui/checkbox";
import type { LabelProps } from "./ui/label";
import type { ImgProps } from "./ui/img";
import type { InputProps } from "./ui/input";
import type { OverlayProps } from "./ui/overlay";
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from "./ui/modal";
import type { PopupProps } from "./ui/popup";
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
  grid5: ComponentTheme<GridProps, GridTheme>;
  grid6: ComponentTheme<GridProps, GridTheme>;
  pageTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  sectionTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  title: ComponentTheme<TypographyProps, TypographyTheme>;
  text: ComponentTheme<TypographyProps, TypographyTheme>;
  link: ComponentTheme<TypographyProps, LinkTheme>;
  listItem: ComponentTheme<TypographyProps, ListItemTheme>;
  list: ComponentTheme<ListProps, ListTheme>;
  checkbox: {
    input: ComponentTheme<CheckboxProps, CheckboxTheme>;
    check: ComponentTheme<CheckboxProps, CheckboxCheckTheme>;
    indeterminate: ComponentTheme<CheckboxProps, CheckboxIndeterminateTheme>;
    wrapper: ComponentTheme<CheckboxProps, CheckboxWrapperTheme>;
  };
  label: ComponentTheme<LabelProps, LabelTheme>;
  img: ComponentTheme<ImgProps, ImgTheme>;
  input: ComponentTheme<InputProps, InputTheme>;
  overlay: ComponentTheme<OverlayProps, OverlayTheme>;
  modal: {
    content: ComponentTheme<ModalProps, ModalContentTheme>;
    overlay: ComponentTheme<OverlayProps, OverlayTheme>;
    header: ComponentTheme<ModalHeaderProps, ModalHeaderTheme>;
    body: ComponentTheme<ModalBodyProps, ModalBodyTheme>;
    footer: ComponentTheme<ModalFooterProps, ModalFooterTheme>;
  };
  popup: ComponentTheme<PopupProps, PopupTheme>;
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
  grid5: defaultGrid5Theme,
  grid6: defaultGrid6Theme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  checkbox: {
    input: defaultCheckboxTheme,
    check: defaultCheckboxCheckTheme,
    indeterminate: defaultCheckboxIndeterminateTheme,
    wrapper: defaultCheckboxWrapperTheme,
  },
  label: defaultLabelTheme,
  img: defaultImgTheme,
  input: defaultInputTheme,
  overlay: defaultOverlayTheme,
  modal: {
    content: defaultModalContentTheme,
    overlay: defaultModalOverlayTheme,
    header: defaultModalHeaderTheme,
    body: defaultModalBodyTheme,
    footer: defaultModalFooterTheme,
  },
  popup: defaultPopupTheme,
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
  grid5?: Partial<BooleanKeys<GridProps>>;
  grid6?: Partial<BooleanKeys<GridProps>>;
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
    indeterminate?: Partial<BooleanKeys<CheckboxProps>>;
    wrapper?: Partial<BooleanKeys<CheckboxProps>>;
  };
  label?: Partial<BooleanKeys<LabelProps>>;
  img?: Partial<BooleanKeys<ImgProps>>;
  input?: Partial<BooleanKeys<InputProps>>;
  overlay?: Partial<BooleanKeys<OverlayProps>>;
  modal?: {
    content?: Partial<BooleanKeys<ModalProps>>;
    overlay?: Partial<BooleanKeys<OverlayProps>>;
    header?: Partial<BooleanKeys<ModalHeaderProps>>;
    body?: Partial<BooleanKeys<ModalBodyProps>>;
    footer?: Partial<BooleanKeys<ModalFooterProps>>;
  };
  popup?: Partial<BooleanKeys<PopupProps>>;
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
  grid5?: Partial<StringValueKeys<GridProps>>;
  grid6?: Partial<StringValueKeys<GridProps>>;
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
    indeterminate?: Partial<StringValueKeys<CheckboxProps>>;
    wrapper?: Partial<StringValueKeys<CheckboxProps>>;
  };
  label?: Partial<StringValueKeys<LabelProps>>;
  img?: Partial<StringValueKeys<ImgProps>>;
  input?: Partial<StringValueKeys<InputProps>>;
  overlay?: Partial<StringValueKeys<OverlayProps>>;
  modal?: {
    content?: Partial<StringValueKeys<ModalProps>>;
    overlay?: Partial<StringValueKeys<OverlayProps>>;
    header?: Partial<StringValueKeys<ModalHeaderProps>>;
    body?: Partial<StringValueKeys<ModalBodyProps>>;
    footer?: Partial<StringValueKeys<ModalFooterProps>>;
  };
  popup?: Partial<StringValueKeys<PopupProps>>;
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
