import React, { createContext, useContext } from 'react';
import { ButtonTheme, defaultButtonTheme } from '../ui/theme/buttonTheme';
import { deepMerge } from '../utils/deepMerge';
import { DeepPartial } from "../utils/deepPartial";

// Define the shape of our theme props
export interface ThemeProps {
  button: ButtonTheme;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps>({button: defaultButtonTheme});

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeProps;
}

// ThemeProvider component
export function ThemeProvider({
  children,
  theme = {button: defaultButtonTheme},
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
