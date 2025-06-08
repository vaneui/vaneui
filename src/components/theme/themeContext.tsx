import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ComponentTheme } from "../ui/theme/common/ComponentTheme";
import { ButtonTheme, defaultButtonTheme } from '../ui/theme/buttonTheme';
import { BadgeTheme, defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { ChipTheme, defaultChipTheme } from '../ui/theme/chipTheme';
import {
  pageTitleTheme,
  sectionTitleTheme,
  titleTheme,
  textTheme,
  linkTheme,
  listItemTheme,
  listTheme, TypographyComponentTheme
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
  ButtonProps,
  GridProps,
  TypographyComponentProps,
  CardProps,
  RowProps,
  ColProps,
  StackProps,
  BadgeProps,
  ChipProps,
  DividerProps,
  ContainerProps,
  SectionProps
} from "../ui/props/props";
import { DeepPartial } from "../utils/deepPartial";
import { deepClone, deepMerge } from "../utils/deepMerge";

export interface ThemeProps {
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
  listItem: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
  list: ComponentTheme<TypographyComponentProps, TypographyComponentTheme<TypographyComponentProps>>;
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

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
}

export function ThemeProvider(
  {
    children,
    theme: themeObject = {},
    themeOverride
  }: ThemeProviderProps) {
  const mergedTheme = useMemo(() => {
    let baseTheme = themeObject
      ? deepMerge(defaultTheme, themeObject)
      : defaultTheme;

    if (typeof themeOverride === 'function') {
      const themeToModify = deepClone(baseTheme);
      return themeOverride(themeToModify);
    }

    return baseTheme;
  }, [themeObject, themeOverride]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeProps {
  return useContext(ThemeContext);
}
