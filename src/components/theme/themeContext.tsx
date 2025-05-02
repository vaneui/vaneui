import React, { createContext, useContext } from 'react';
import { ButtonTheme, defaultButtonTheme } from '../ui/classes/buttonTheme';
import { deepMerge } from '../utils/deepMerge';

// Define the shape of our theme props
export interface ThemeProps {
  button?: Partial<ButtonTheme>;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps | undefined>(undefined);

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
}

// ThemeProvider component
export function ThemeProvider({
  children,
  theme = {},
}: ThemeProviderProps) {
  // Provide the context to children
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = (): ThemeProps | undefined => {
  const context = useContext(ThemeContext);
  return context;
};

// Custom hook to use the button theme
export const useButtonTheme = (): ButtonTheme => {
  const theme = useTheme();
  // Merge the default button theme with any overrides from the context
  return theme?.button 
    ? deepMerge(defaultButtonTheme, theme.button)
    : defaultButtonTheme;
};
