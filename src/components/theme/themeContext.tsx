import React, { createContext, useContext } from 'react';

// Define the shape of our theme props
export interface ThemeProps {
  button?: {
  };
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
