import React, { createContext, useContext } from 'react';
import { StyleVariantComponentTheme } from "../ui/theme/common/styleVariantComponentTheme";
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
import { ButtonProps } from "../ui/props/props";

// Define the shape of our theme props
export interface ThemeProps {
  button: StyleVariantComponentTheme<ButtonProps>;
  badge: StyleVariantComponentTheme;
  card: SimpleComponentTheme;
  chip: StyleVariantComponentTheme;
  divider: SimpleComponentTheme;
  container: SimpleComponentTheme;
  row: SimpleComponentTheme;
  col: SimpleComponentTheme;
  stack: SimpleComponentTheme;
  section: SimpleComponentTheme;
  pageTitle: SimpleComponentTheme;
  sectionTitle: SimpleComponentTheme;
  title: SimpleComponentTheme;
  text: SimpleComponentTheme;
  link: SimpleComponentTheme;
  listItem: SimpleComponentTheme;
  list: SimpleComponentTheme;
  grid3: SimpleComponentTheme;
  grid4: SimpleComponentTheme;
}

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
