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
import { CheckboxTheme, defaultCheckboxTheme } from './ui/theme/checkboxTheme';
import { LabelTheme, defaultLabelTheme } from './ui/theme/labelTheme';
import { CheckTheme, defaultCheckTheme } from './ui/theme/checkTheme';
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
  CheckProps
} from "./ui/props/props";
import { DeepPartial } from "./utils/deepPartial";
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

export const COMPONENT = ['button', 'badge', 'chip', 'code', 'card', 'divider', 'row', 'col', 'stack', 'section',
  'grid3', 'grid4', 'pageTitle', 'sectionTitle', 'title', 'text', 'link', 'list', 'listItem', 'checkbox', 'label', 'check'] as const;
export type ComponentKey = typeof COMPONENT[number];

export interface ThemeProps extends Record<ComponentKey, ComponentTheme<object, object>> {
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
  checkbox: ComponentTheme<CheckboxProps, CheckboxTheme>;
  label: ComponentTheme<LabelProps, LabelTheme>;
  check: ComponentTheme<CheckProps, CheckTheme>;
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
  checkbox: defaultCheckboxTheme,
  label: defaultLabelTheme,
  check: defaultCheckTheme,
};

export type ThemeDefaults = Partial<Record<ComponentKey, Record<string, boolean>>>;
export type ThemeExtraClasses = Partial<Record<ComponentKey, Record<string, string>>>;

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
        for (const key in themeDefaults) {
          const componentKey = key as ComponentKey;
          const componentTheme = finalTheme[componentKey];
          const themeDefault = themeDefaults[componentKey]
          if (themeDefault !== undefined) {
            finalTheme[componentKey].defaults =
              mergeDefaults(componentTheme.defaults as Record<string, boolean>, themeDefaults[componentKey] as Record<string, boolean>);
          }
        }
      }

      if (extraClasses !== undefined) {
        // Clone before modifying to ensure isolation
        finalTheme = deepClone(finalTheme);
        for (const key in extraClasses) {
          const componentKey = key as ComponentKey;
          const componentExtraClasses = extraClasses[componentKey];
          if (componentExtraClasses !== undefined) {
            finalTheme[componentKey].extraClasses = {
              ...finalTheme[componentKey].extraClasses,
              ...componentExtraClasses
            };
          }
        }
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
