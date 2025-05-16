import React, { createContext, useContext } from 'react';
import { defaultButtonTheme } from '../ui/theme/buttonTheme';
import { defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { ChipTheme, defaultChipTheme } from '../ui/theme/chipTheme';
import {
  TypographyComponentTheme,
  pageTitleTheme,
  sectionTitleTheme,
  titleTheme,
  textTheme,
  linkTheme,
  listItemTheme,
  listTheme
} from '../ui/theme/typographyComponentTheme';
import { GridTheme } from '../ui/theme/gridTheme';
import { defaultCardTheme } from "../ui/theme/cardTheme";
import { DividerTheme } from "../ui/theme/dividerTheme";
import { ContainerTheme } from "../ui/theme/containerTheme";
import { StackTheme } from "../ui/theme/stackTheme";
import { ColTheme } from "../ui/theme/colTheme";
import { SectionTheme } from "../ui/theme/sectionTheme";
import { StyleVariantComponentTheme } from "../ui/theme/common/styleVariantComponentTheme";
import { SimpleComponentTheme } from "../ui/theme/common/simpleComponentTheme";
import { defaultRowTheme } from "../ui/theme/rowTheme";

// Define the shape of our theme props
export interface ThemeProps {
  button: StyleVariantComponentTheme;
  badge: StyleVariantComponentTheme;
  card: SimpleComponentTheme;
  chip: ChipTheme;
  divider: DividerTheme;
  container: ContainerTheme;
  row: SimpleComponentTheme;
  col: ColTheme;
  stack: StackTheme;
  section: SectionTheme;
  pageTitle: TypographyComponentTheme;
  sectionTitle: TypographyComponentTheme;
  title: TypographyComponentTheme;
  text: TypographyComponentTheme;
  link: TypographyComponentTheme;
  listItem: TypographyComponentTheme;
  list: TypographyComponentTheme;
  grid3: GridTheme;
  grid4: GridTheme;
}

export const defaultTheme: ThemeProps = {
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  card: defaultCardTheme,
  chip: defaultChipTheme,
  divider: DividerTheme.createDefaultDividerTheme(),
  container: ContainerTheme.createDefaultContainerTheme(),
  row: defaultRowTheme,
  col: ColTheme.createDefaultColTheme(),
  stack: StackTheme.createDefaultStackTheme(),
  section: SectionTheme.createDefaultSectionTheme(),
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  grid3: GridTheme.createGrid3Theme(),
  grid4: GridTheme.createGrid4Theme(),
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps>(defaultTheme);

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeProps;
}

// ThemeProvider component
export function ThemeProvider({
                                children,
                                theme = defaultTheme,
                              }: ThemeProviderProps) {
  // Provide the context to children
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = (): ThemeProps => {
  const context = useContext(ThemeContext);
  return context;
};
