import React, { createContext, useContext, useMemo } from 'react';
import { ComponentTheme } from "../ui/theme/common/ComponentTheme";
import { ButtonTheme, defaultButtonTheme } from '../ui/theme/buttonTheme';
import { BadgeTheme, defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { ChipTheme, defaultChipTheme } from '../ui/theme/chipTheme';
import {
  linkTheme,
  listItemTheme,
  listTheme,
  pageTitleTheme,
  sectionTitleTheme,
  textTheme,
  titleTheme,
  TypographyComponentTheme
} from '../ui/theme/typographyComponentTheme';
import { CardTheme, defaultCardTheme } from "../ui/theme/cardTheme";
import { defaultRowTheme, RowTheme } from "../ui/theme/rowTheme";
import { defaultDividerTheme, DividerTheme } from '../ui/theme/dividerTheme';
import { ContainerTheme, defaultContainerTheme } from '../ui/theme/containerTheme';
import { ColTheme, defaultColTheme } from '../ui/theme/colTheme';
import { defaultStackTheme, StackTheme } from '../ui/theme/stackTheme';
import { defaultSectionTheme, SectionTheme } from "../ui/theme/sectionTheme";
import { defaultGrid3Theme, defaultGrid4Theme, GridTheme } from "../ui/theme/gridTheme";
import {
  BadgeProps,
  ButtonProps,
  CardProps,
  ChipProps,
  ColProps,
  ContainerProps,
  DividerProps,
  GridProps,
  RowProps,
  SectionProps,
  StackProps,
  TypographyComponentProps
} from "../ui/props/props";
import { DeepPartial } from "../utils/deepPartial";
import { deepClone, deepMerge, mergeDefaults } from "../utils/deepMerge";

export const COMPONENT_KEYS = ['button', 'badge', 'chip', 'card', 'divider', 'row', 'col', 'stack', 'section',
  'grid3', 'grid4', 'pageTitle', 'sectionTitle', 'title', 'text', 'link', 'list', 'listItem'] as const;
export type ComponentKey = typeof COMPONENT_KEYS[number];

export interface ThemeProps extends Record<ComponentKey, ComponentTheme<object, object>> {
  button: ComponentTheme<ButtonProps, ButtonTheme<ButtonProps>>;
  badge: ComponentTheme<BadgeProps, BadgeTheme<BadgeProps>>;
  chip: ComponentTheme<ChipProps, ChipTheme<ChipProps>>;
  card: ComponentTheme<CardProps, CardTheme<CardProps>>;
  divider: ComponentTheme<DividerProps, DividerTheme<DividerProps>>;
  container: ComponentTheme<ContainerProps, ContainerTheme<ContainerProps>>;
  row: ComponentTheme<RowProps, RowTheme<RowProps>>;
  col: ComponentTheme<ColProps, ColTheme<ColProps>>;
  stack: ComponentTheme<StackProps, StackTheme<StackProps>>;
  section: ComponentTheme<SectionProps, SectionTheme<SectionProps>>;
  grid3: ComponentTheme<GridProps, GridTheme<GridProps>>;
  grid4: ComponentTheme<GridProps, GridTheme<GridProps>>;
  pageTitle: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  sectionTitle: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  title: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  text: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  link: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  list: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  listItem: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
}

export type PartialTheme = DeepPartial<ThemeProps>;

export const defaultTheme: ThemeProps = {
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  chip: defaultChipTheme,
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
};

export type ThemeDefaults = Partial<Record<ComponentKey, Record<string, boolean>>>;

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeDefaults?: ThemeDefaults;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
}

export function ThemeProvider(
  {
    children,
    theme: themeObject = {},
    themeDefaults,
    themeOverride
  }: ThemeProviderProps) {
  const mergedTheme = useMemo(() => {

        let finalTheme = themeObject
          ? deepMerge(defaultTheme, themeObject)
          : defaultTheme;

        if (typeof themeOverride === 'function') {
          const themeToModify = deepClone(finalTheme);
          finalTheme = themeOverride(themeToModify);
        }

        if (themeDefaults !== undefined) {
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

        return finalTheme;
      }

      ,
      [themeObject, themeOverride]
    )
  ;

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeProps {
  return useContext(ThemeContext);
}
