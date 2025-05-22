import React, { createContext, useContext } from 'react';
import { VariantComponentTheme } from "../ui/theme/common/variantComponentTheme";
import { SimpleComponentTheme } from "../ui/theme/common/simpleComponentTheme";
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
  button: VariantComponentTheme<ButtonProps>;
  badge: VariantComponentTheme<BadgeProps>;
  chip: VariantComponentTheme<ChipProps>;
  card: SimpleComponentTheme<CardProps>;
  divider: SimpleComponentTheme<LayoutComponentProps>;
  container: SimpleComponentTheme<LayoutComponentProps>;
  row: SimpleComponentTheme<RowProps>;
  col: SimpleComponentTheme<ColProps>;
  stack: SimpleComponentTheme<StackProps>;
  section: SimpleComponentTheme<LayoutComponentProps>;
  grid3: SimpleComponentTheme<GridProps>;
  grid4: SimpleComponentTheme<GridProps>;
  pageTitle: SimpleComponentTheme<TypographyComponentProps>;
  sectionTitle: SimpleComponentTheme<TypographyComponentProps>;
  title: SimpleComponentTheme<TypographyComponentProps>;
  text: SimpleComponentTheme<TypographyComponentProps>;
  link: SimpleComponentTheme<TypographyComponentProps>;
  listItem: SimpleComponentTheme<TypographyComponentProps>;
  list: SimpleComponentTheme<TypographyComponentProps>;
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
