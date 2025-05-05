import React, { createContext, useContext } from 'react';
import { ButtonTheme, defaultButtonTheme } from '../ui/theme/buttonTheme';
import { BadgeTheme, defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { CardTheme, defaultCardTheme } from '../ui/theme/cardTheme';
import { ChipTheme, defaultChipTheme } from '../ui/theme/chipTheme';
import { DividerTheme, defaultDividerTheme } from '../ui/theme/dividerTheme';
import { ContainerTheme, defaultContainerTheme } from '../ui/theme/containerTheme';
import { RowTheme, defaultRowTheme } from '../ui/theme/rowTheme';
import { StackTheme, defaultStackTheme } from '../ui/theme/stackTheme';
import { SectionTheme, defaultSectionTheme } from '../ui/theme/sectionTheme';
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
import { GridTheme, defaultGridTheme, grid3Theme, grid4Theme } from '../ui/theme/gridTheme';
import { ColTheme, defaultColTheme } from '../ui/theme/colTheme';
import { deepMerge } from '../utils/deepMerge';
import { DeepPartial } from "../utils/deepPartial";

// Define the shape of our theme props
export interface ThemeProps {
  button: ButtonTheme;
  badge: BadgeTheme;
  card: CardTheme;
  chip: ChipTheme;
  divider: DividerTheme;
  container: ContainerTheme;
  row: RowTheme;
  stack: StackTheme;
  section: SectionTheme;
  pageTitle: TypographyComponentTheme;
  sectionTitle: TypographyComponentTheme;
  title: TypographyComponentTheme;
  text: TypographyComponentTheme;
  link: TypographyComponentTheme;
  listItem: TypographyComponentTheme;
  list: TypographyComponentTheme;
  grid: GridTheme;
  grid3: GridTheme;
  grid4: GridTheme;
  col: ColTheme;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps>({
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  card: defaultCardTheme,
  chip: defaultChipTheme,
  divider: defaultDividerTheme,
  container: defaultContainerTheme,
  row: defaultRowTheme,
  stack: defaultStackTheme,
  section: defaultSectionTheme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  grid: defaultGridTheme,
  grid3: grid3Theme,
  grid4: grid4Theme,
  col: defaultColTheme
});

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeProps;
}

// ThemeProvider component
export function ThemeProvider({
  children,
  theme = {
    button: defaultButtonTheme, 
    badge: defaultBadgeTheme, 
    card: defaultCardTheme, 
    chip: defaultChipTheme, 
    divider: defaultDividerTheme, 
    container: defaultContainerTheme, 
    row: defaultRowTheme, 
    stack: defaultStackTheme, 
    section: defaultSectionTheme,
    pageTitle: pageTitleTheme,
    sectionTitle: sectionTitleTheme,
    title: titleTheme,
    text: textTheme,
    link: linkTheme,
    listItem: listItemTheme,
    list: listTheme,
    grid: defaultGridTheme,
    grid3: grid3Theme,
    grid4: grid4Theme,
    col: defaultColTheme
  },
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
