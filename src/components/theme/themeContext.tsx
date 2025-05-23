import React, { createContext, useContext } from 'react';
import { ComponentTheme } from "../ui/theme/common/ComponentTheme";
import { defaultButtonTheme } from '../ui/theme/buttonTheme';
import { defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { defaultChipTheme } from '../ui/theme/chipTheme';
import {
  pageTitleTheme,
  sectionTitleTheme,
  titleTheme,
  textTheme,
  linkTheme,
  listItemTheme,
  listTheme
} from '../ui/theme/typographyComponentTheme';
import { defaultCardTheme } from "../ui/theme/cardTheme";
import { defaultRowTheme } from "../ui/theme/rowTheme";
import { defaultDividerTheme } from '../ui/theme/dividerTheme';
import { defaultContainerTheme } from '../ui/theme/containerTheme';
import { defaultColTheme } from '../ui/theme/colTheme';
import { defaultStackTheme } from '../ui/theme/stackTheme';
import { defaultSectionTheme } from "../ui/theme/sectionTheme";
import { defaultGrid3Theme, defaultGrid4Theme } from "../ui/theme/gridTheme";
import {
  ButtonProps,
  GridProps,
  TypographyComponentProps,
  CardProps,
  RowProps,
  ColProps,
  StackProps,
  BadgeProps, ChipProps, LayoutComponentProps
} from "../ui/props/props";
import { DeepPartial } from "../utils/deepPartial";
import { deepMerge } from "../utils/deepMerge";

// Define the shape of our theme props
export interface ThemeProps {
  button: ComponentTheme<ButtonProps>;
  badge: ComponentTheme<BadgeProps>;
  chip: ComponentTheme<ChipProps>;
  card: ComponentTheme<CardProps>;
  divider: ComponentTheme<LayoutComponentProps>;
  container: ComponentTheme<LayoutComponentProps>;
  row: ComponentTheme<RowProps>;
  col: ComponentTheme<ColProps>;
  stack: ComponentTheme<StackProps>;
  section: ComponentTheme<LayoutComponentProps>;
  grid3: ComponentTheme<GridProps>;
  grid4: ComponentTheme<GridProps>;
  pageTitle: ComponentTheme<TypographyComponentProps>;
  sectionTitle: ComponentTheme<TypographyComponentProps>;
  title: ComponentTheme<TypographyComponentProps>;
  text: ComponentTheme<TypographyComponentProps>;
  link: ComponentTheme<TypographyComponentProps>;
  listItem: ComponentTheme<TypographyComponentProps>;
  list: ComponentTheme<TypographyComponentProps>;
}

// Export the partial theme type for external use
export type PartialTheme = DeepPartial<ThemeProps>;

export const defaultTheme: ThemeProps = {
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  card: defaultCardTheme,
  chip: defaultChipTheme,
  divider: defaultDividerTheme,
  container: defaultContainerTheme,
  row: defaultRowTheme,
  col: defaultColTheme,
  stack: defaultStackTheme,
  section: defaultSectionTheme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  grid3: defaultGrid3Theme,
  grid4: defaultGrid4Theme,
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps>(defaultTheme);

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
}

// ThemeProvider component
export function ThemeProvider({
                                children,
                                theme,
                              }: ThemeProviderProps) {
  // Merge the partial theme with the default theme
  const mergedTheme = theme ? deepMerge(defaultTheme, theme) : defaultTheme;

  // Provide the context to children
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = (): ThemeProps => {
  const context = useContext(ThemeContext);
  return context;
};
