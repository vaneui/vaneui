import React, { createContext, useContext } from 'react';
import { ButtonTheme, defaultButtonTheme } from '../ui/theme/buttonTheme';
import { BadgeTheme, defaultBadgeTheme } from '../ui/theme/badgeTheme';
import { ChipTheme, defaultChipTheme } from '../ui/theme/chipTheme';
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
import { GridTheme } from '../ui/theme/gridTheme';
import { CardThemeClass } from "../ui/theme/cardThemeClass";
import { DividerThemeClass } from "../ui/theme/dividerThemeClass";
import { ContainerThemeClass } from "../ui/theme/containerThemeClass";
import { RowThemeClass } from "../ui/theme/rowThemeClass";
import { StackThemeClass } from "../ui/theme/stackThemeClass";
import { ColThemeClass } from "../ui/theme/colThemeClass";

// Define the shape of our theme props
export interface ThemeProps {
  button: ButtonTheme;
  badge: BadgeTheme;
  card: CardThemeClass;
  chip: ChipTheme;
  divider: DividerThemeClass;
  container: ContainerThemeClass;
  row: RowThemeClass;
  stack: StackThemeClass;
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
  col: ColThemeClass;
}

export const defaultTheme: ThemeProps = {
  button: defaultButtonTheme,
  badge: defaultBadgeTheme,
  card: CardThemeClass.createDefaultCardTheme(),
  chip: defaultChipTheme,
  divider: DividerThemeClass.createDefaultDividerTheme(),
  container: ContainerThemeClass.createDefaultContainerTheme(),
  row: RowThemeClass.createDefaultRowTheme(),
  stack: StackThemeClass.createDefaultStackTheme(),
  section: defaultSectionTheme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  grid: GridTheme.createDefaultGridTheme(),
  grid3: GridTheme.createGrid3Theme(),
  grid4: GridTheme.createGrid4Theme(),
  col: ColThemeClass.createDefaultColTheme()
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
